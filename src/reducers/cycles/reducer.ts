import { produce } from 'immer'
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
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload],
      //   activeCycleId: action.payload.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case ActionType.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedAt = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionType.FINISH_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedAt = new Date()
        draft.activeCycleId = null
      })
    }
    default: {
      return state
    }
  }
}
