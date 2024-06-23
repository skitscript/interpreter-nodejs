import type { DismissInteraction } from '../DismissInteraction'
import type { MenuInteraction } from '../MenuInteraction'

/**
 * Describes how the user interacts with the result of interpreting a parsed
 * document.
 */
export type Interaction =
  | DismissInteraction
  | MenuInteraction

/* c8 ignore next */
