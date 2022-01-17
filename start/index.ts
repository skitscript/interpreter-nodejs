import type {
  InterpreterState,
  InterpreterStateCharacter,
  ValidDocument
} from '@skitscript/types-nodejs'
import { resume } from '../resume'

/**
 * Starts a new session of a given parsed document.
 * @param document The parsed document of which to start a new session.
 * @returns The first state to present to the user.
 */
export const start = (document: ValidDocument): InterpreterState => {
  if (document.instructions.length === 0) {
    return {
      type: 'invalid',
      error: { type: 'infiniteLoop' }
    }
  }

  const characters: InterpreterStateCharacter[] = []

  for (const identifier of document.identifierInstances) {
    if (
      identifier.type === 'character' &&
      !characters.some(
        (character) => character.normalized === identifier.normalized
      )
    ) {
      characters.push({
        normalized: identifier.normalized,
        verbatim: identifier.verbatim,
        emote: 'neutral',
        state: { type: 'notPresent' }
      })
    }
  }

  return resume(
    document,
    {
      type: 'valid',
      flagsSet: [],
      characters,
      speakers: [],
      background: null,
      line: null,
      interaction: { type: 'dismiss', instructionIndex: 0 }
    },
    0
  )
}
