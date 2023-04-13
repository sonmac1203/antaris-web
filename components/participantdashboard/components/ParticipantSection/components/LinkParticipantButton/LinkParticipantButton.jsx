import { Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { ParticipantSectionContext } from '../../context';
import { useParticipantDashboard } from '@/lib/pa/dashboard';
import { useRouter } from 'next/router';

export const LinkParticipantButton = () => {
  const [loading, setLoading] = useState(false);
  const { participantData } = useParticipantDashboard();
  const { inputCards } = useContext(ParticipantSectionContext);

  const { email } = participantData;

  const connectEndpoint = '/api/dev/amz/connect';

  const router = useRouter();

  const handleLink = () => {
    const inputs = inputCards.map(({ participantRef, projectRef }) => ({
      participantIdentifier: participantRef.current.value,
      projectId: projectRef.current.value,
    }));

    const participants = inputs.map(({ participantIdentifier }) => ({
      participant_identifier: participantIdentifier,
    }));

    const forwardingState = {
      chaining: true,
      data: {
        email,
        project_id: inputs[0].projectId,
        participants,
      },
    };

    setLoading(true);

    router.push({
      pathname: connectEndpoint,
      query: {
        state: encodeURIComponent(JSON.stringify(forwardingState)),
      },
    });
  };

  return (
    <Button onClick={handleLink} className='d-flex align-items-center gap-2'>
      <i className='fa-solid fa-link' />
      {!loading ? 'Link to my Alexa' : 'Linking...'}
    </Button>
  );
};
