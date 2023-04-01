import { formatDate } from '@/core/utils';
import { ListGroup, Button, ProgressBar } from 'react-bootstrap';

export const HistoryItem = ({ data: { assigned_at, progress } }) => {
  const timeOfAssignement = formatDate(new Date(assigned_at));

  return (
    <ListGroup.Item className='pt-2 px-0 pb-4'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div>
          <i className='fa-regular fa-clock me-1' />
          {timeOfAssignement}
        </div>
        <Button variant='link' className='text-decoration-none'>
          View details
        </Button>
      </div>
      <ProgressBar striped now={progress} label={`${progress}%`} />
    </ListGroup.Item>
  );
};
