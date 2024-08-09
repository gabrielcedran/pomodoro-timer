import { useContext, useEffect } from 'react'
import { CountdownContainer, TimerSeparator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '..'

export function Countdown() {
  const {
    activeCycle,
    finishCycle,
    activeCycleSecondsElapsed,
    updateActiveCycleSecondsElapsed,
  } = useContext(CyclesContext)

  const activeCycleTotalSeconds = activeCycle
    ? activeCycle.durationInMinuts * 60
    : 0

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

  useEffect(() => {
    let setIntervalRef: number
    if (activeCycle) {
      setIntervalRef = setInterval(() => {
        const secondsElapsed = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (secondsElapsed <= activeCycleTotalSeconds) {
          updateActiveCycleSecondsElapsed(secondsElapsed)
        } else {
          finishCycle()
          clearInterval(setIntervalRef)
        }
      }, 1000)
    }
    return () => {
      if (setIntervalRef) {
        clearInterval(setIntervalRef)
      }
    }
  }, [
    activeCycle,
    activeCycleTotalSeconds,
    finishCycle,
    updateActiveCycleSecondsElapsed,
  ])

  return (
    <CountdownContainer>
      <span>{currentMinutes[0]}</span>
      <span>{currentMinutes[1]}</span>
      <TimerSeparator>:</TimerSeparator>
      <span>{currentSeconds[0]}</span>
      <span>{currentSeconds[1]}</span>
    </CountdownContainer>
  )
}
