import { HistoryContainer, HistoryList, Status } from './styles'

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
              <td>
                <Status color="yellow">In progress</Status>
              </td>
            </tr>
            <tr>
              <td>Read about react</td>
              <td>30 minutes</td>
              <td>About 1 hour ago</td>
              <td>
                <Status color="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Read about react</td>
              <td>30 minutes</td>
              <td>About 1 hour ago</td>
              <td>
                <Status color="red">aborted</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
