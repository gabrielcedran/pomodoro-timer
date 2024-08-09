import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
  TimerSeparator,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Provide task description'),
  durationInMinutes: zod
    .number()
    .min(5)
    .max(90, 'Duration can only be of up to 90 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  durationInMinuts: number
  startedAt: Date
  interruptedAt?: Date
  finshedAt?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [activeCycleSecondsElapsed, setActiveCycleSecondsElapsed] = useState(0)

  const { register, handleSubmit, watch, reset /* formState */ } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        durationInMinutes: 5,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const activeCycleTotalSeconds = activeCycle
    ? activeCycle.durationInMinuts * 60
    : 0

  useEffect(() => {
    let setIntervalRef: number
    if (activeCycle) {
      setIntervalRef = setInterval(() => {
        const secondsElapsed = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (secondsElapsed <= activeCycleTotalSeconds) {
          setActiveCycleSecondsElapsed(secondsElapsed)
        } else {
          setCycles((currentState) => [
            ...currentState.map((cycle) => {
              if (cycle.id === activeCycle.id) {
                return { ...cycle, finishedAt: new Date() }
              } else {
                return cycle
              }
            }),
          ])
          setActiveCycleId(null)
          clearInterval(setIntervalRef)
        }
      }, 1000)
    }
    return () => {
      if (setIntervalRef) {
        clearInterval(setIntervalRef)
      }
    }
  }, [activeCycle, activeCycleTotalSeconds])

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

  const activeCycleTotalSecondsRemaining = activeCycle
    ? activeCycleTotalSeconds - activeCycleSecondsElapsed
    : 0

  const activeCycleMinutesReimaining = Math.floor(
    activeCycleTotalSecondsRemaining / 60,
  )
  const activeCycleSecondsRemaining = activeCycleTotalSecondsRemaining % 60

  const currentMinutes = String(activeCycleMinutesReimaining).padStart(2, '0')
  const currentSeconds = String(activeCycleSecondsRemaining).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Pomodoro ${currentMinutes}:${currentSeconds}`
    }
  }, [currentMinutes, currentSeconds, activeCycle])

  // this effectively turns the input into a controlled input, triggering rerender at every key stroke
  const taskInput = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Task</label>
          <TaskInput
            id="task"
            placeholder="description"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
          </datalist>
          <label htmlFor="durationInMinutes">for</label>
          <DurationMinutesInput
            type="number"
            id="durationInMinutes"
            placeholder="00"
            disabled={!!activeCycle}
            {...register('durationInMinutes', { valueAsNumber: true })}
            max={90}
            min={5}
            step={5}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{currentMinutes[0]}</span>
          <span>{currentMinutes[1]}</span>
          <TimerSeparator>:</TimerSeparator>
          <span>{currentSeconds[0]}</span>
          <span>{currentSeconds[1]}</span>
        </CountdownContainer>

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
