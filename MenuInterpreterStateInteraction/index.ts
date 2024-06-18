import type { MenuInterpreterStateInteractionOption } from '../MenuInterpreterStateInteractionOption'

/**
 * The user must select an option from a menu.
 */
export interface MenuInterpreterStateInteraction {
  /**
   * Indicates the type of user interaction.
   */
  readonly type: 'menu'

  /**
   * The options which are listed in the menu.
   */
  readonly options: readonly MenuInterpreterStateInteractionOption[]
}
