import { ListGroup, Button } from 'react-bootstrap';

export const ActionButtons = () => {
  return (
    <ListGroup.Item className='py-4 px-0 d-flex gap-2 flex-row-reverse'>
      <Button>
        <i className='fa-regular fa-paper-plane me-2' /> Send
      </Button>
      <Button>
        <i className='fa-regular fa-bell me-2' />
        Notify
      </Button>
    </ListGroup.Item>
  );
};
