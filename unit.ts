import type {
  Document,
  InterpreterStateCharacter,
  InterpreterStateError,
  InterpreterStateInteraction,
  InterpreterStateRun,
} from "@skitscript/types-nodejs";
import * as fs from "fs";
import * as path from "path";
import { start, resume } from ".";
import { parse } from "@skitscript/parser-nodejs";

const casesPath = path.join(
  __dirname,
  `submodules`,
  `skitscript`,
  `interpreter-test-suite`,
  `cases`
);

const caseNames = fs.readdirSync(casesPath);

for (const caseName of caseNames) {
  describe(caseName, () => {
    const casePath = path.join(casesPath, caseName);

    let document: Document;

    beforeAll(async () => {
      const source = await fs.promises.readFile(
        path.join(casePath, `input.skitscript`),
        `utf8`
      );

      document = parse(source);
    });

    it(`is parsable`, () => {
      expect(document.type)
        .withContext(JSON.stringify(document, null, 2))
        .toEqual(`valid`);
    });

    it(`generates no warnings once parsed`, () => {
      if (document.type === `valid`) {
        expect(document.warnings)
          .withContext(JSON.stringify(document.warnings, null, 2))
          .toEqual([]);
      }
    });

    const scenariosPath = path.join(casePath, `scenarios`);

    const scenarioNames = fs.readdirSync(scenariosPath);

    for (const scenarioName of scenarioNames) {
      describe(scenarioName, () => {
        type Step =
          | {
              readonly type: `invalid`;
              readonly error: InterpreterStateError;
            }
          | {
              readonly type: `valid`;
              readonly characters: ReadonlyArray<InterpreterStateCharacter>;
              readonly speakers: ReadonlyArray<string>;
              readonly background: null | string;
              readonly line: null | ReadonlyArray<InterpreterStateRun>;
              readonly interaction: InterpreterStateInteraction;
            };

        let expected: ReadonlyArray<Step | number>;
        let actual: ReadonlyArray<Step | number>;

        beforeAll(async () => {
          if (document.type === `valid`) {
            const expectedText = await fs.promises.readFile(
              path.join(scenariosPath, scenarioName),
              `utf8`
            );

            expected = JSON.parse(expectedText);
            actual = [];

            let state = start(document);

            for (;;) {
              actual = [
                ...actual,
                state.type === `valid`
                  ? {
                      type: `valid`,
                      characters: state.characters,
                      speakers: state.speakers,
                      background: state.background,
                      line: state.line,
                      interaction: state.interaction,
                    }
                  : state,
              ];

              if (actual.length === expected.length) {
                break;
              } else if (state.type === `invalid`) {
                fail(`Expected to continue after receiving an invalid state.`);

                break;
              }

              const statementIndex = expected[actual.length] as number;

              actual = [...actual, statementIndex];

              state = resume(document, state, statementIndex);
            }
          }
        });

        it(`executes as expected`, () => {
          if (document.type === `valid`) {
            expect(actual).toEqual(expected);
          }
        });
      });
    }
  });
}
