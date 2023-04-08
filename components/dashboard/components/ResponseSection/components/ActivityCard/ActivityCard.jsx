import { Card } from 'react-bootstrap';
import { formatDate } from '@/core/utils';
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
        <Card.Body className='pb-2'>
          <Card.Title>{content.identifier}</Card.Title>
          <Card.Text>{content.text}</Card.Text>
        </Card.Body>
        <Card.Footer
          className='text-muted bg-white pt-0 d-flex align-items-center gap-1 border-top-0'
          style={{ fontSize: '12px' }}
        >
          <i className='fa-regular fa-clock' />
          {formatDate(new Date(content.provided_at))}
        </Card.Footer>
      </Card>
    </div>
  );
};
