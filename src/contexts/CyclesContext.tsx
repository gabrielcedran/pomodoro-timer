import { createContext, ReactNode, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionType,
  addCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'

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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [activeCycleSecondsElapsed, setActiveCycleSecondsElapsed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function finishCycle() {
    dispatch(finishCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      durationInMinutes: 1,
      startedAt: new Date(),
    }

    dispatch(addCycleAction(newCycle))
    setActiveCycleSecondsElapsed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
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
