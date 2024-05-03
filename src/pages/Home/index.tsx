import { Play } from 'phosphor-react';
import {
  CountdownContainer, Divider, FormContainer, HomeContainer,
  MinutesInput,
  StartCountdownButton,
  TaskInput,
} from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">
            I&apos;ll work on
          </label>
          <TaskInput type="text" list="task-suggestions" id="task" placeholder="Task or Project name" />
          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
          </datalist>

          <label htmlFor="minutes">
            for
          </label>
          <MinutesInput
            type="number"
            id="minutes"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Divider>:</Divider>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
