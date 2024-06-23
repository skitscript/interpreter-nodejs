/**
 * A character is currently playing an exit animation.
 */
export interface ExitingCharacterState {
  /**
   * Identifies the type of character state.
   */
  readonly type: 'exiting'

  /**
   * The (normalized) name of the exit animation.
   */
  readonly animation: string
}

/* c8 ignore next */
