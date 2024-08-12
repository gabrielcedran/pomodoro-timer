import { Cycle } from './reducer'

export enum ActionType {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

type AddCycleActionType = {
  type: ActionType.CREATE_CYCLE
  payload: Cycle
}

export const addCycleAction = (newCycle: Cycle): AddCycleActionType => ({
  type: ActionType.CREATE_CYCLE,
  payload: newCycle,
})

type FinishCycleActionType = {
  type: ActionType.FINISH_CYCLE
  payload: null
}

export const finishCycleAction = (): FinishCycleActionType => ({
  type: ActionType.FINISH_CYCLE,
  payload: null,
})

type InterruptCycleActionType = {
  type: ActionType.INTERRUPT_CYCLE
  payload: null
}

export const interruptCycleAction = (): InterruptCycleActionType => ({
  type: ActionType.INTERRUPT_CYCLE,
  payload: null,
})

export type CyclesActions =
  | AddCycleActionType
  | FinishCycleActionType
  | InterruptCycleActionType
