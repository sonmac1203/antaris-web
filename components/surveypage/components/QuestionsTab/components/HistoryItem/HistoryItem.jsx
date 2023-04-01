import { ListGroup, Button, ProgressBar } from 'react-bootstrap';

export const HistoryItem = () => {
  return (
    <ListGroup.Item className='pt-2 px-0 pb-4'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div>
          <i className='fa-regular fa-clock me-1' /> 3:00PM, Mar 29
        </div>
        <Button variant='link' className='text-decoration-none'>
          View details
        </Button>
      </div>
      <ProgressBar striped now={100} label={`100%`} />
    </ListGroup.Item>
  );
};
