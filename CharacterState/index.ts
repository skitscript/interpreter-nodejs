import type { EnteringCharacterState } from '../EnteringCharacterState'
import type { ExitingCharacterState } from '../ExitingCharacterState'
import type { NotPresentCharacterState } from '../NotPresentCharacterState'
import type { PresentCharacterState } from '../PresentCharacterState'

/**
 * The state of a character.
 */
export type CharacterState =
  | NotPresentCharacterState
  | EnteringCharacterState
  | PresentCharacterState
  | ExitingCharacterState

/* c8 ignore next */
