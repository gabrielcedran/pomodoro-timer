import { ActionType, CyclesActions } from './actions'

export interface Cycle {
  id: string
  task: string
  durationInMinutes: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: CyclesActions) {
  switch (action.type) {
    case ActionType.CREATE_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        activeCycleId: action.payload.id,
      }
    case ActionType.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedAt: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionType.FINISH_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedAt: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default: {
      return state
    }
  }
}
