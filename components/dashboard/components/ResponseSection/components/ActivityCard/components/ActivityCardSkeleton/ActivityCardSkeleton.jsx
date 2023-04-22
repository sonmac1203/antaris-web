import { Placeholder, Card } from 'react-bootstrap';

export const ActivityCardSkeleton = () => {
  return (
    <div className='d-flex flex-column gap-1'>
      <Placeholder as='div' animation='glow' className='mb-2'>
        <Placeholder xs={8} size='sm' bg='secondary' />
      </Placeholder>
      <Card>
        <Card.Body className='pb-2'>
          <Placeholder as={Card.Title} animation='glow'>
            <Placeholder xs={7} size='sm' bg='secondary' />
          </Placeholder>
          <Placeholder as={Card.Text} animation='glow'>
            <Placeholder xs={4} size='sm' bg='secondary' />
          </Placeholder>
        </Card.Body>
        <Placeholder
          as={Card.Footer}
          animation='glow'
          className='text-muted bg-white pt-0 border-top-0'
        >
          <Placeholder xs={5} size='xs' bg='secondary' />
        </Placeholder>
      </Card>
    </div>
  );
};
