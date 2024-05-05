import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'; // no export default thus the * method

import {
  CountdownContainer, Divider, FormContainer, HomeContainer,
  MinutesInput,
  StartCountdownButton,
  TaskInput,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Project / Task name is mandatory'),
  minutes: zod.number().min(5, 'Minimum time is 5 minutes').max(60, 'Maximum time is 60 minutes'),
});

type CreateNewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const {
    register, handleSubmit, watch, reset,
  } = useForm<CreateNewCycleFormData>(
    {
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        taskName: '',
        minutes: 0,
      },
    },
  );

  function handleCreateNewCycle(data: CreateNewCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch('taskName');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">
            I&apos;ll work on
          </label>
          <TaskInput
            type="text"
            list="task-suggestions"
            id="taskName"
            placeholder="Task or Project name"
            {...register('taskName')}
          />
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
            {...register('minutes', { valueAsNumber: true })}
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

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
