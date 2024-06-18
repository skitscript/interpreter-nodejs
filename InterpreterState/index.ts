import type { InvalidInterpreterState } from '../InvalidInterpreterState'
import type { ValidInterpreterState } from '../ValidInterpreterState'

/**
 * The result of interpreting a parsed document.
 */
export type InterpreterState = ValidInterpreterState | InvalidInterpreterState
