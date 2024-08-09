import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  TaskInput,
  TimerSeparator,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Provide task description'),
  durationInMinutes: zod
    .number()
    .min(5)
    .max(90, 'Duration can only be of up to 90 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch /* formState */ } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        durationInMinutes: 5,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormData) {
    // formState.errors (to get errors upon submit)
  }

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
            {...register('durationInMinutes', { valueAsNumber: true })}
            max={90}
            min={5}
            step={5}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <TimerSeparator>:</TimerSeparator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={!taskInput}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
