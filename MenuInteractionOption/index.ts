import type { Run } from '@skitscript/parser-nodejs'

/**
 * An option the user can select from a menu.
 */
export interface MenuInteractionOption {
  /**
   * The content of the menu option as shown to the user.
   */
  readonly content: readonly Run[]

  /**
   * The instruction index to which to jump when the menu option is selected.
   */
  readonly instructionIndex: number
}

/* c8 ignore next */
