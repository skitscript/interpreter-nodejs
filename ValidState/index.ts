import type { Interaction } from '../Interaction'
import type { Character } from '../Character'
import type { Run } from '@skitscript/parser-nodejs'
import type { Warning } from '../Warning'

/**
 * The result of successfully interpreting a parsed document.
 */
export interface ValidState {
  /**
   * Indicates the type of result.
   */
  readonly type: 'valid'

  /**
   * The (normalized) names of the flags which are currently set.  This may be
   * empty.
   */
  readonly flagsSet: readonly string[]

  /**
   * The states of the characters.
   */
  readonly characters: readonly Character[]

  /**
   * The (normalized) names of the characters which speak the current
   * line/present the current menu.  This may include characters which are never
   * or not currently visible.
   */
  readonly speakers: readonly string[]

  /**
   * The (normalized) name of the background which is currently displayed.  This
   * may be null, in which case, a white background should be displayed instead.
   */
  readonly background: null | string

  /**
   * The runs of text of the current line.  This may be null.
   */
  readonly line: null | readonly Run[]

  /**
   * Describes how the user can interact with the current state.
   */
  readonly interaction: Interaction

  /**
   * The warnings generated while interpreting the document.
   */
  readonly warnings: readonly Warning[]
}

/* c8 ignore next */
