import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { enGB } from 'date-fns/locale/en-GB'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Tasks History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.durationInMinutes} minutes</td>
                  <td>
                    {formatDistanceToNow(cycle.startedAt, {
                      addSuffix: true,
                      locale: enGB,
                    })}
                  </td>
                  <td>
                    {cycle.finshedAt && <Status color="green">Finished</Status>}
                    {cycle.interruptedAt && (
                      <Status color="red">Interrupted</Status>
                    )}
                    {!cycle.finshedAt && !cycle.interruptedAt && (
                      <Status color="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
