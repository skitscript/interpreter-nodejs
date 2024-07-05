import type { MenuInteractionOption } from '../MenuInteractionOption'

/**
 * The user must select an option from a menu.
 */
export interface MenuInteraction {
  /**
   * Indicates the type of user interaction.
   */
  readonly type: 'menu'

  /**
   * The options which are listed in the menu.
   */
  readonly options: readonly MenuInteractionOption[]
}

/* c8 ignore next */
