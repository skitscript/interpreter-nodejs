import type { InterpreterState, ValidDocument } from "@skitscript/types-nodejs";
import { resume } from "../resume";

/**
 * Starts a new session of a given parsed document.
 * @param document The parsed document of which to start a new session.
 * @returns The first state to present to the user.
 */
export const start = (document: ValidDocument): InterpreterState => {
  const characters: string[] = [];

  for (const identifier of document.identifierInstances) {
    if (
      identifier.type === `character` &&
      !characters.includes(identifier.normalized)
    ) {
      characters.push(identifier.normalized);
    }
  }

  return resume(
    document,
    {
      type: `valid`,
      flagsSet: [],
      characters: characters.map((character) => ({
        character,
        state: { type: `notPresent` },
        emote: `neutral`,
      })),
      speakers: [],
      background: null,
      line: null,
      interaction: { type: `dismiss`, instructionIndex: 0 },
    },
    0
  );
};
