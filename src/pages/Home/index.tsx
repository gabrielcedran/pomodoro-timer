import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Provide task description'),
  durationInMinutes: zod
    .number()
    .min(5)
    .max(90, 'Duration can only be of up to 90 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      durationInMinutes: 5,
    },
  })

  const { handleSubmit, watch, reset /* formState */ } = newCycleForm

  // this effectively turns the input into a controlled input, triggering rerender at every key stroke
  const taskInput = watch('task')

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCycle} type="button">
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
