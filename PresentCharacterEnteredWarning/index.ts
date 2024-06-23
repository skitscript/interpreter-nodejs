import type { Identifier } from '@skitscript/parser-nodejs'

/**
 * A character specifies an entry animation, but is already present.
 */
export interface PresentCharacterEnteredWarning {
  /**
   * Identifies the type of warning.
   */
  readonly type: 'presentCharacterEntered'

  /**
   * The line on which the entry animation is specified.
   */
  readonly line: number

  /**
   * The name of the character which is to animate.
   */
  readonly character: Identifier

  /**
   * The name of the animation which is to be played.
   */
  readonly animation: Identifier
}

/* c8 ignore next */
