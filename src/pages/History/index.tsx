import { HistoryContainer, HistoryList } from './styles'

export function History() {
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
            <tr>
              <td>Read about react</td>
              <td>30 minutes</td>
              <td>About 30 min ago</td>
              <td>In progress</td>
            </tr>
            <tr>
              <td>Read about react</td>
              <td>30 minutes</td>
              <td>About 1 hour ago</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
