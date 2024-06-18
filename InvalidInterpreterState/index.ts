import type { InterpreterStateError } from '../InterpreterStateError'

/**
 * The result of unsuccessfully interpreting a parsed document.
 */
export interface InvalidInterpreterState {
  /**
   * Indicates the type of result.
   */
  readonly type: 'invalid'

  /**
   * The error which was encountered.
   */
  readonly error: InterpreterStateError
}
