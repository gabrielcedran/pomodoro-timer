import { createContext, ReactNode, useState } from 'react'

interface Cycle {
  id: string
  task: string
  durationInMinutes: number
  startedAt: Date
  interruptedAt?: Date
  finshedAt?: Date
}

interface CreateCycleData {
  task: string
  durationInMinutes: number
}

type CyclesContextType = {
  activeCycle: Cycle | undefined
  activeCycleSecondsElapsed: number
  finishCycle: () => void
  updateActiveCycleSecondsElapsed: (value: number) => void
  createCreateNewCycle: (data: CreateCycleData) => void
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [activeCycleSecondsElapsed, setActiveCycleSecondsElapsed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function finishCycle() {
    setCycles((currentState) => [
      ...currentState.map((cycle) => {
        if (cycle.id === activeCycle!.id) {
          return { ...cycle, finishedAt: new Date() }
        } else {
          return cycle
        }
      }),
    ])
    setActiveCycleId(null)
  }

  function createCreateNewCycle(data: CreateCycleData) {
    // formState.errors (to get errors upon submit)

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      durationInMinutes: data.durationInMinutes,
      startedAt: new Date(),
    }
    setCycles((currentState) => [...currentState, newCycle])
    setActiveCycleId(newCycle.id)
    setActiveCycleSecondsElapsed(0)
    // reset()
  }

  function interruptCycle() {
    setCycles((currentState) => [
      ...currentState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ])
    setActiveCycleId(null)
  }

  function updateActiveCycleSecondsElapsed(value: number) {
    setActiveCycleSecondsElapsed(value)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        finishCycle,
        activeCycleSecondsElapsed,
        updateActiveCycleSecondsElapsed,
        createCreateNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
