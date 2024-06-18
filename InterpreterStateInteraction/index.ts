import type { DismissInterpreterStateInteraction } from '../DismissInterpreterStateInteraction'
import type { MenuInterpreterStateInteraction } from '../MenuInterpreterStateInteraction'

/**
 * Describes how the user interacts with the result of interpreting a parsed
 * document.
 */
export type InterpreterStateInteraction =
  | DismissInterpreterStateInteraction
  | MenuInterpreterStateInteraction
