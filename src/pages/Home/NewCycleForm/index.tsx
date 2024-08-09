import { DurationMinutesInput, FormContainer, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
  )
}
