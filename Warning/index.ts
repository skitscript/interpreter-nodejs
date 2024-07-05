import type { NonPresentCharacterExitedWarning } from '../NonPresentCharacterExitedWarning'
import type { PresentCharacterEnteredWarning } from '../PresentCharacterEnteredWarning'

/**
 * A warning generated while interpreting a document.
 */
export type Warning = PresentCharacterEnteredWarning
| NonPresentCharacterExitedWarning

/* c8 ignore next */
