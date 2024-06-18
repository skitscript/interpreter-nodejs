import type { InterpreterStateRun } from '../InterpreterStateRun'

/**
 * An option the user can select from a menu.
 */
export interface MenuInterpreterStateInteractionOption {
  /**
   * The content of the menu option as shown to the user.
   */
  readonly content: readonly InterpreterStateRun[]

  /**
   * The instruction index to which to jump when the menu option is selected.
   */
  readonly instructionIndex: number
}
