import type { CharacterState } from '../CharacterState'

/**
 * A character within the result of interpreting a parsed document.
 */
export interface Character {
  /**
   * The (normalized) name of the character.
   */
  readonly normalized: string

  /**
   * The (verbatim) name of the character.
   */
  readonly verbatim: string

  /**
   * The (normalized) name of the emote the character is currently displaying.
   */
  readonly emote: string

  /**
   * The state of the character.
   */
  readonly state: CharacterState
}

/* c8 ignore next */
