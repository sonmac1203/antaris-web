import { Button } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { ParticipantSectionContext } from '../../context';
import { useParticipantDashboard } from '@/lib/pa/dashboard';

export const SaveParticipantButton = () => {
  const { participantData, loading, error, success, saveNewParticipants } =
    useParticipantDashboard();
  const { inputCards, startRefreshing } = useContext(ParticipantSectionContext);

  const { email } = participantData;

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        startRefreshing();
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  const handleSave = async () => {
    const participants = inputCards.map(({ participantRef }) => ({
      participant_identifier: participantRef.current.value,
    }));
    const requestBody = {
      participants,
      projectId: inputCards[0].projectRef.current.value,
      email,
    };
    await saveNewParticipants(requestBody);
  };

  return (
    <Button onClick={handleSave} className='d-flex align-items-center gap-2'>
      {!loading ? 'Save new participants' : 'Saving...'}
    </Button>
  );
};
