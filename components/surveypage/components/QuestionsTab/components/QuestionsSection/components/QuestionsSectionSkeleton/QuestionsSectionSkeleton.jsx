import { ListGroup, Placeholder } from 'react-bootstrap';

export const QuestionsSectionSkeleton = () => {
  return (
    <div className='d-flex flex-column gap-2'>
      <Placeholder as='span' animation='glow'>
        <Placeholder xs={3} bg='secondary' />
      </Placeholder>
      <ListGroup>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ListGroup>
    </div>
  );
};

const ListItem = () => (
  <ListGroup.Item className='d-flex py-3 gap-2 flex-column'>
    <div className='d-flex align-items-center'>
      <Placeholder as='span' animation='glow' style={{ width: '35%' }}>
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder
        as='span'
        animation='glow'
        className='ms-3'
        style={{ width: '90px' }}
      >
        <Placeholder xs={12} bg='secondary' size='xs' />
      </Placeholder>
    </div>
    <Placeholder as='div' animation='glow'>
      <Placeholder xs={7} bg='secondary' size='sm' />
    </Placeholder>
  </ListGroup.Item>
);
