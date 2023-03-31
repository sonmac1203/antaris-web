import { Accordion } from 'react-bootstrap';
import { ParticipantListItem } from '../ParticipantListItem';

export const ParticipantsSection = () => {
  return (
    <section className='participant-list'>
      <h5>Participants</h5>
      <Accordion>
        <ParticipantListItem />
        <ParticipantListItem />
      </Accordion>
    </section>
  );
};
