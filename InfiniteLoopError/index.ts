/**
 * Interpreting failed as an infinite loop which does not contain user
 * interaction was found.
 */
export interface InfiniteLoopError {
  /**
   * Indicates the type of error.
   */
  readonly type: 'infiniteLoop'
}

/* c8 ignore next */
