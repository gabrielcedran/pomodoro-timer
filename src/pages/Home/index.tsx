import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

interface Cycle {
  id: string
  task: string
  durationInMinuts: number
  startedAt: Date
  interruptedAt?: Date
  finshedAt?: Date
}

type CyclesContextType = {
  activeCycle: Cycle | undefined
  activeCycleSecondsElapsed: number
  finishCycle: () => void
  updateActiveCycleSecondsElapsed: (value: number) => void
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType,
)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Provide task description'),
  durationInMinutes: zod
    .number()
    .min(5)
    .max(90, 'Duration can only be of up to 90 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [activeCycleSecondsElapsed, setActiveCycleSecondsElapsed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      durationInMinutes: 5,
    },
  })

  const { handleSubmit, watch, reset /* formState */ } = newCycleForm

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    // formState.errors (to get errors upon submit)

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      durationInMinuts: data.durationInMinutes,
      startedAt: new Date(),
    }
    setCycles((currentState) => [...currentState, newCycle])
    setActiveCycleId(newCycle.id)
    setActiveCycleSecondsElapsed(0)
    reset()
  }

  function handleInterruptCycle() {
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

  console.log(cycles)
  // this effectively turns the input into a controlled input, triggering rerender at every key stroke
  const taskInput = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            finishCycle,
            activeCycleSecondsElapsed,
            updateActiveCycleSecondsElapsed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!taskInput}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
