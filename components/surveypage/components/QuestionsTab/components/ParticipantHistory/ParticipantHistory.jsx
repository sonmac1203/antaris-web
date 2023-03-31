import { Accordion, ListGroup } from 'react-bootstrap';
import { HistoryItem, ActionButtons } from './components';

export const ParticipantHistory = () => {
  return (
    <Accordion.Body className='px-4 py-0'>
      <ListGroup variant='flush'>
        <HistoryItem />
        <HistoryItem />
        <ActionButtons />
      </ListGroup>
    </Accordion.Body>
  );
};
