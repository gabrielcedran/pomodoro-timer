import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>
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
              <td>Something</td>
              <td>20 minutes</td>
              <td>Around 2 months ago</td>
              <td><Status statusColor="red">In progress</Status></td>
            </tr>
            <tr>
              <td>Something</td>
              <td>20 minutes</td>
              <td>Around 2 months ago</td>
              <td><Status statusColor="green">Finished</Status></td>
            </tr>
            <tr>
              <td>Something</td>
              <td>20 minutes</td>
              <td>Around 2 months ago</td>
              <td><Status statusColor="yellow">Interrupted</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}