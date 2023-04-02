import { ListGroup } from 'react-bootstrap';
import { ParticipantItem } from '../ParticipantItem';

export const ParticipantList = ({ participants }) => {
  return (
    <ListGroup as='ol'>
      {participants.map((participant, k) => (
        <ParticipantItem key={k} participant={participant} />
      ))}
    </ListGroup>
  );
};
