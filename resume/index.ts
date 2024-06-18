import type { Condition, Instruction, MenuOptionInstruction, Run, ValidDocument } from '@skitscript/parser-nodejs'
import type { InterpreterStateRun } from '../InterpreterStateRun'
import type { ValidInterpreterState } from '../ValidInterpreterState'
import type { InterpreterState } from '../InterpreterState'
import type { InterpreterStateCharacter } from '../InterpreterStateCharacter'

const stripRuns = (
  runs: readonly Run[]
): readonly InterpreterStateRun[] =>
  runs.map((run) => ({
    bold: run.bold,
    code: run.code,
    italic: run.italic,
    plainText: run.plainText
  }))

/**
 * Continues a previously started session.
 * @param document The parsed document of the previously started session.
 * @param state The most recent state presented to the user.
 * @param instructionIndex The statement index selected by the user.
 * @returns The next state to present to the user.
 */
export const resume = (
  document: ValidDocument,
  state: ValidInterpreterState,
  instructionIndex: number
): InterpreterState => {
  const flagsSet = [...state.flagsSet]
  const characters: InterpreterStateCharacter[] = state.characters.map(
    (character) => ({
      ...character,
      state:
        character.state.type === 'exiting'
          ? { type: 'notPresent' }
          : character.state.type === 'entering'
            ? { type: 'present' }
            : character.state
    })
  )
  let background = state.background
  let speakers = state.speakers
  let line: null | readonly InterpreterStateRun[] = null
  const menuOptions: MenuOptionInstruction[] = []

  const history: Array<{
    readonly instructionIndex: number
    readonly flagsSet: readonly string[]
  }> = []

  const conditionPasses = (condition: null | Condition): boolean => {
    if (condition == null) {
      return true
    } else {
      switch (condition.type) {
        case 'flagClear':
          return !flagsSet.includes(condition.flag.normalized)

        case 'flagSet':
          return flagsSet.includes(condition.flag.normalized)

        case 'everyFlagClear':
          return condition.flags.every(
            (flag) => !flagsSet.includes(flag.normalized)
          )

        case 'everyFlagSet':
          return condition.flags.every((flag) =>
            flagsSet.includes(flag.normalized)
          )

        case 'someFlagsClear':
          return condition.flags.some(
            (flag) => !flagsSet.includes(flag.normalized)
          )

        case 'someFlagsSet':
          return condition.flags.some((flag) =>
            flagsSet.includes(flag.normalized)
          )
      }
    }
  }

  for (;;) {
    const instruction = document.instructions[instructionIndex] as Instruction

    if (
      menuOptions.length > 0 &&
      (instruction.type !== 'menuOption' || instructionIndex === 0)
    ) {
      return {
        type: 'valid',
        flagsSet,
        characters,
        background,
        speakers,
        line,
        interaction: {
          type: 'menu',
          options: menuOptions.map((menuOption) => ({
            content: stripRuns(menuOption.content),
            instructionIndex: menuOption.instructionIndex
          }))
        }
      }
    } else if (
      line !== null &&
      (instruction.type !== 'menuOption' || instructionIndex === 0)
    ) {
      return {
        type: 'valid',
        flagsSet,
        characters,
        background,
        speakers,
        line,
        interaction: {
          type: 'dismiss',
          instructionIndex
        }
      }
    } else if (
      history.some(
        (item) =>
          item.instructionIndex === instructionIndex &&
          item.flagsSet.length === flagsSet.length &&
          item.flagsSet.every((flag) => flagsSet.includes(flag))
      )
    ) {
      return {
        type: 'invalid',
        error: { type: 'infiniteLoop' }
      }
    } else {
      history.push({
        instructionIndex,
        flagsSet: [...flagsSet]
      })

      switch (instruction.type) {
        case 'clear': {
          const index = flagsSet.indexOf(instruction.flag.normalized)

          if (index !== -1) {
            flagsSet.splice(index, 1)
          }

          break
        }

        case 'set': {
          if (!flagsSet.includes(instruction.flag.normalized)) {
            flagsSet.push(instruction.flag.normalized)
          }

          break
        }

        case 'emote': {
          const index = characters.findIndex(
            (character) =>
              character.normalized === instruction.character.normalized
          )

          const character = characters[index] as InterpreterStateCharacter

          characters.splice(index, 1, {
            ...character,
            emote: instruction.emote.normalized
          })

          break
        }

        case 'entryAnimation': {
          const index = characters.findIndex(
            (character) =>
              character.normalized === instruction.character.normalized
          )

          const previousCharacter = state.characters[
            index
          ] as InterpreterStateCharacter

          const character = characters[index] as InterpreterStateCharacter

          switch (previousCharacter.state.type) {
            case 'entering':
            case 'present':
              characters.splice(index, 1, {
                ...character,
                state: {
                  type: 'present'
                }
              })
              break

            case 'exiting':
            case 'notPresent': {
              characters.splice(index, 1, {
                ...character,
                state: {
                  type: 'entering',
                  animation: instruction.animation.normalized
                }
              })
              break
            }
          }

          break
        }

        case 'exitAnimation': {
          const index = characters.findIndex(
            (character) =>
              character.normalized === instruction.character.normalized
          )

          const previousCharacter = state.characters[
            index
          ] as InterpreterStateCharacter

          const character = characters[index] as InterpreterStateCharacter

          switch (previousCharacter.state.type) {
            case 'entering':
            case 'present': {
              characters.splice(index, 1, {
                ...character,
                state: {
                  type: 'exiting',
                  animation: instruction.animation.normalized
                }
              })

              break
            }

            case 'exiting':
            case 'notPresent':
              characters.splice(index, 1, {
                ...character,
                state: {
                  type: 'notPresent'
                }
              })

              break
          }
          break
        }

        case 'location': {
          background = instruction.background.normalized

          break
        }

        case 'speaker': {
          speakers = instruction.characters.map(
            (character) => character.normalized
          )

          break
        }

        case 'line': {
          line = stripRuns(instruction.content)

          break
        }

        case 'menuOption': {
          if (conditionPasses(instruction.condition)) {
            menuOptions.push(instruction)
          }

          break
        }

        case 'jump': {
          if (conditionPasses(instruction.condition)) {
            instructionIndex = instruction.instructionIndex

            continue
          } else {
            break
          }
        }
      }

      instructionIndex++

      if (instructionIndex === document.instructions.length) {
        instructionIndex = 0
      }
    }
  }
}
