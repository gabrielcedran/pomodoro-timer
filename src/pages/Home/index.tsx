import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  TaskInput,
  TimerSeparator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Task</label>
          <TaskInput
            id="task"
            placeholder="description"
            list="task-suggestions"
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
