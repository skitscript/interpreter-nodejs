import type { InvalidState } from '../InvalidState'
import type { ValidState } from '../ValidState'

/**
 * The result of interpreting a parsed document.
 */
export type State = ValidState | InvalidState

/* c8 ignore next */
