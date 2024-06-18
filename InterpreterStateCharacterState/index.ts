import type { EnteringInterpreterStateCharacterState } from '../EnteringInterpreterStateCharacterState'
import type { ExitingInterpreterStateCharacterState } from '../ExitingInterpreterStateCharacterState'
import type { NotPresentInterpreterStateCharacterState } from '../NotPresentInterpreterStateCharacterState'
import type { PresentInterpreterStateCharacterState } from '../PresentInterpreterStateCharacterState'

/**
 * The state of a character.
 */
export type InterpreterStateCharacterState =
  | NotPresentInterpreterStateCharacterState
  | EnteringInterpreterStateCharacterState
  | PresentInterpreterStateCharacterState
  | ExitingInterpreterStateCharacterState
