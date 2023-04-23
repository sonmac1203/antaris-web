import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { ParticipantsSectionContext } from '../ParticipantsSection/context';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { DropdownItemButton } from './components';

const getTimeFromLastNotification = (timestamp) => {
  if (!timestamp) return 0;
  return new Date().getTime() - new Date(timestamp).getTime();
};

export const ActionButtons = ({
  participantIdentifier,
  secondaryIdentifier,
  participantFirstName,
  participantLastName,
  thisSurvey,
  hasLinked,
}) => {
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

  const participantData = {
    participantIdentifier,
    secondaryIdentifier,
    participantFirstName,
    participantLastName,
  };

  const participantUrl = `/re/dashboard/participants/${participantIdentifier}`;

  const { notified, last_notified, assigned_at } = thisSurvey || {};

  const handleSend = async () => await sendSurvey([participantData]);
  const handleSendAndNotify = async () =>
    await sendAndNotifySurvey([participantData]);
  const handleNotify = async () => await notifySurvey([participantData]);

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        refreshThisSection();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  const sendButtonDisabled =
    !hasLinked || !surveyData.content || assigned_at || loading || success;

  const timeFromLastNotification = getTimeFromLastNotification(last_notified);

  const notifyButtonDisabled =
    !hasLinked ||
    !thisSurvey ||
    !surveyData.content ||
    loading ||
    (notified && timeFromLastNotification <= 3600000);

  return (
    <DropdownButton
      id='action-dropdown'
      variant='primary'
      title='Actions'
      className='ms-auto'
      align='end'
    >
      <DropdownItemButton
        error={error}
        errorText='Failed'
        loading={loading}
        loadingText='Assigning...'
        success={success || assigned_at}
        successText='Assigned'
        disabled={sendButtonDisabled}
        onClick={handleSend}
        icon='fa-regular fa-paper-plane'
      >
        Assign to this participant
      </DropdownItemButton>
      <DropdownItemButton
        error={error}
        errorText='Failed'
        loading={loading}
        loadingText='Notifying...'
        success={success || (notified && timeFromLastNotification <= 3600000)}
        successText='Notified'
        disabled={notifyButtonDisabled}
        onClick={handleNotify}
        icon='fa-regular fa-bell'
      >
        Notify this participant
      </DropdownItemButton>
      {!assigned_at && (
        <DropdownItemButton
          error={error}
          errorText='Failed'
          loading={loading}
          loadingText='Assigning...'
          success={success || assigned_at}
          successText='Assigned'
          disabled={sendButtonDisabled}
          onClick={handleSendAndNotify}
          icon='fa-solid fa-bullhorn'
        >
          Assign and notify
        </DropdownItemButton>
      )}
      <Dropdown.Item className='py-2' as={Link} href={participantUrl}>
        <i className='fa-regular fa-user me-2' />
        View details
      </Dropdown.Item>
    </DropdownButton>
  );
};
