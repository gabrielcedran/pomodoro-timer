import { createContext, ReactNode, useReducer, useState } from 'react'

interface Cycle {
  id: string
  task: string
  durationInMinutes: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CreateCycleData {
  task: string
  durationInMinutes: number
}

type CyclesContextType = {
  activeCycle: Cycle | undefined
  activeCycleSecondsElapsed: number
  cycles: Cycle[]
  finishCycle: () => void
  updateActiveCycleSecondsElapsed: (value: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType,
)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload],
            activeCycleId: action.payload.id,
          }
        case 'INTERRUPT_CYCLE':
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
        case 'FINISH_CYCLE':
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
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const [activeCycleSecondsElapsed, setActiveCycleSecondsElapsed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function finishCycle() {
    dispatch({
      type: 'FINISH_CYCLE',
      payload: {},
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      durationInMinutes: 1,
      startedAt: new Date(),
    }

    dispatch({
      type: 'CREATE_CYCLE',
      payload: newCycle,
    })
    setActiveCycleSecondsElapsed(0)
  }

  function interruptCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {},
    })
  }

  function updateActiveCycleSecondsElapsed(value: number) {
    setActiveCycleSecondsElapsed(value)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        finishCycle,
        activeCycleSecondsElapsed,
        updateActiveCycleSecondsElapsed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
