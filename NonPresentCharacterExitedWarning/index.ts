import type { Identifier } from '@skitscript/parser-nodejs'

/**
 * A character specifies an exit animation, but is not currently present.
 */
export interface NonPresentCharacterExitedWarning {
  /**
   * Identifies the type of warning.
   */
  readonly type: 'nonPresentCharacterExited'

  /**
   * The line on which the exit animation is specified.
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
