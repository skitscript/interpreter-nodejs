import type { Error } from '../Error'

/**
 * The result of unsuccessfully interpreting a parsed document.
 */
export interface InvalidState {
  /**
   * Indicates the type of result.
   */
  readonly type: 'invalid'

  /**
   * The error which was encountered.
   */
  readonly error: Error
}

/* c8 ignore next */
