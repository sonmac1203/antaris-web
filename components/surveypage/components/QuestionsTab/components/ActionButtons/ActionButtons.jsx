import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { ParticipantsSectionContext } from '../ParticipantsSection/context';
import { ListGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export const ActionButtons = ({ participantIdentifier, thisSurvey }) => {
  const { refreshThisSection } = useContext(ParticipantsSectionContext);
  const {
    error,
    loading,
    success,
    sendSurvey,
    notifySurvey,
    sendAndNotifySurvey,
    surveyData,
  } = useSurvey();

  const { notified, last_notified } = thisSurvey || {};

  const handleSend = async () => {
    await sendSurvey([participantIdentifier]);
  };

  const handleSendAndNotify = async () => {
    await sendAndNotifySurvey([participantIdentifier]);
  };

  const handleNotify = async () => {
    await notifySurvey([participantIdentifier]);
  };

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        refreshThisSection();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  const sendButtonDisabled =
    loading || success || thisSurvey || !surveyData.content;

  const timeFromLastNotification = last_notified
    ? new Date().getTime() - new Date(last_notified).getTime()
    : 0;

  const notifyButtonDisabled =
    loading ||
    !surveyData.content ||
    !thisSurvey ||
    (notified && timeFromLastNotification <= 3600000);

  return (
    <ListGroup.Item className='py-4 px-0 d-flex gap-2 flex-row-reverse'>
      <DropdownButton id='dropdown-basic-button' title='Actions' align='end'>
        <Dropdown.Item disabled={sendButtonDisabled} onClick={handleSend}>
          {error
            ? 'Failed'
            : loading
            ? 'Sending...'
            : success || thisSurvey
            ? 'Sent'
            : 'Send'}
        </Dropdown.Item>
        <Dropdown.Item disabled={notifyButtonDisabled} onClick={handleNotify}>
          Notify
        </Dropdown.Item>
        <Dropdown.Item
          disabled={sendButtonDisabled}
          onClick={handleSendAndNotify}
        >
          Send and notify
        </Dropdown.Item>
      </DropdownButton>
      <Link href={`/re/dashboard/participants/${participantIdentifier}`}>
        <Button variant='link' className='text-decoration-none'>
          View details
        </Button>
      </Link>
    </ListGroup.Item>
  );
};
