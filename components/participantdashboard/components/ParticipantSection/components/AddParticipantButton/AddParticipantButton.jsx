import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ParticipantSectionContext } from '../../context';

export const AddParticipantButton = () => {
  const { handleAddNewParticipant } = useContext(ParticipantSectionContext);
  return (
    <Button
      variant='link'
      className='m-0 px-0 d-flex align-items-center gap-2 text-decoration-none'
      onClick={handleAddNewParticipant}
    >
      <i className='fa-solid fa-plus' />
      Add
    </Button>
  );
};
