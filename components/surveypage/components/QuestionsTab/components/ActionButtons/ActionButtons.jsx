import { useContext, useEffect } from 'react';
import { useSurvey } from '@/core/hooks';
import { ParticipantsSectionContext } from '../ParticipantsSection/context';
import { ListGroup, Button } from 'react-bootstrap';

export const ActionButtons = ({ participantIdentifier, surveySent }) => {
  const { refreshThisSection } = useContext(ParticipantsSectionContext);
  const { error, loading, success, sendSurvey } = useSurvey();

  const handleSend = async () => {
    await sendSurvey([participantIdentifier]);
  };

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        refreshThisSection();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  return (
    <ListGroup.Item className='py-4 px-0 d-flex gap-2 flex-row-reverse'>
      <Button
        variant='primary'
        onClick={handleSend}
        disabled={loading || success || surveySent}
      >
        <i className='fa-regular fa-paper-plane me-2' />
        {error
          ? 'Failed'
          : loading
          ? 'Sending...'
          : success || surveySent
          ? 'Sent'
          : 'Send'}
      </Button>
      {/* <Button disabled>
        <i className='fa-regular fa-bell me-2' />
        Notify
      </Button> */}
    </ListGroup.Item>
  );
};
