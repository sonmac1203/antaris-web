import { Card } from 'react-bootstrap';
import { CardHeader } from './components';

export const ActivityCard = ({ item }) => {
  const { responded_by: participant, responded_to: survey, content } = item;
  return (
    <div className='d-flex flex-column gap-1'>
      <CardHeader
        participant={participant}
        survey={survey}
        timeProvided={content.provided_at}
      />
      <Card>
        <Card.Body>
          <Card.Title>{content.identifier}</Card.Title>
          <Card.Text>{content.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
