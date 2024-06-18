/**
 * Interpreting failed as an infinite loop which does not contain user
 * interaction was found.
 */
export interface InfiniteLoopInterpreterStateError {
  /**
   * Indicates the type of interpreter error.
   */
  readonly type: 'infiniteLoop'
}
