import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import { start, resume, type Error, type Character, type MenuInteractionOption } from './index.js'
import { parse, type Document, type Run } from '@skitscript/parser-nodejs'

const casesPath = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  'submodules',
  'skitscript',
  'interpreter-test-suite',
  'cases'
)

const caseNames = fs.readdirSync(casesPath)

for (const caseName of caseNames) {
  describe(caseName, () => {
    const casePath = path.join(casesPath, caseName)

    let document: Document

    beforeAll(async () => {
      const source = await fs.promises.readFile(
        path.join(casePath, 'input.skitscript'),
        'utf8'
      )

      document = parse(source)
    })

    it('is parsable', () => {
      expect(document.type)
        .withContext(JSON.stringify(document, null, 2))
        .toEqual('valid')
    })

    it('generates no warnings once parsed', () => {
      if (document.type === 'valid') {
        expect(document.warnings)
          .withContext(JSON.stringify(document.warnings, null, 2))
          .toEqual([])
      }
    })

    const scenariosPath = path.join(casePath, 'scenarios')

    const scenarioNames = fs.readdirSync(scenariosPath)

    for (const scenarioName of scenarioNames) {
      describe(scenarioName, () => {
        type Step =
          | {
            readonly type: 'invalid'
            readonly error: Error
          }
          | {
            readonly type: 'valid'
            readonly characters: readonly Character[]
            readonly speakers: readonly string[]
            readonly background: null | string
            readonly line: null | readonly Run[]
            readonly interaction:
            | {
              readonly type: 'dismiss'
            }
            | {
              readonly type: 'menu'
              readonly options: ReadonlyArray<{
                readonly content: readonly Run[]
              }>
            }
          }

        let expected: ReadonlyArray<Step | number>
        let actual: ReadonlyArray<Step | number>

        beforeAll(async () => {
          if (document.type === 'valid') {
            const expectedText = await fs.promises.readFile(
              path.join(scenariosPath, scenarioName),
              'utf8'
            )

            expected = JSON.parse(expectedText)
            actual = []

            let state = start(document)

            for (;;) {
              actual = [
                ...actual,
                state
              ]

              if (actual.length === expected.length) {
                break
              } else if (state.type === 'invalid') {
                fail('Expected to continue after receiving an invalid state.')

                break
              }
              if (state.interaction.type === 'dismiss') {
                state = resume(
                  document,
                  state,
                  state.interaction.instructionIndex
                )
              } else {
                const optionIndex = expected[actual.length] as number

                actual = [...actual, optionIndex]

                state = resume(
                  document,
                  state,
                  (
                    state.interaction.options[
                      optionIndex
                    ] as MenuInteractionOption
                  ).instructionIndex
                )
              }
            }
          }
        })

        it('executes as expected', () => {
          if (document.type === 'valid') {
            expect(actual).toEqual(expected)
          }
        })
      })
    }
  })
}
