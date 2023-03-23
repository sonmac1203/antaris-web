import { useSurvey } from '@/core/hooks';
import { Table } from 'react-bootstrap';

export const StoredSurveySection = () => {
  const {
    surveyData: { content },
  } = useSurvey();

  if (!content) return null;

  return (
    <section>
      <h2>Stored survey</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {content.map((q, k) => (
            <tr id={k} key={k}>
              <td>{k + 1}</td>
              <td>{q.text}</td>
              <td>{q.completed ? 'Completed' : 'Not completed'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};
