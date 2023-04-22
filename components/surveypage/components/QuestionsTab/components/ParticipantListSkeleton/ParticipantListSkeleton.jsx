import { ListGroup, Placeholder } from 'react-bootstrap';

export const ParticipantListSkeleton = () => {
  return (
    <ListGroup>
      <ListItem />
      <ListItem />
      <ListItem />
    </ListGroup>
  );
};

const ListItem = () => (
  <ListGroup.Item className='d-flex py-3 gap-1 flex-column'>
    <div className='d-flex align-items-center'>
      <Placeholder as='span' animation='glow' style={{ width: '35%' }}>
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder.Button
        aria-hidden='true'
        className='ms-auto p-0'
        style={{ width: '84px' }}
      />
    </div>
    <Placeholder as='div' animation='glow'>
      <Placeholder xs={3} bg='secondary' size='xs' />
    </Placeholder>
  </ListGroup.Item>
);
