import { useAmazon } from '@/lib/pa/amazon';
import { useParticipantDashboard } from '@/lib/pa/dashboard';
import { useEffect, useCallback, useContext } from 'react';
import { ParticipantSectionContext } from '../../context';
import { ParticipantsListItem } from '../ParticipantsListItem';

export const CurrentParticipantsList = () => {
  const { participantData } = useParticipantDashboard();
  const { email: userEmail } = participantData;
  const { error, loading, participants, fetchParticipants } = useAmazon();
  const { inputCards, refreshKey } = useContext(ParticipantSectionContext);

  const fetchAllParticipants = useCallback(
    async (email) => {
      await fetchParticipants(email);
    },
    [fetchParticipants, refreshKey]
  );

  useEffect(() => {
    fetchAllParticipants(userEmail);
  }, [refreshKey]);

  return (
    <div className={`d-flex flex-column gap-3`}>
      {error ? (
        <ParticipantsListItem text='Could not load participants.' />
      ) : loading ? (
        <ParticipantsListItem text='Loading participants...' />
      ) : !participants || participants.length === 0 ? (
        <ParticipantsListItem text='No participants found.' />
      ) : (
        participants.map(({ participant_identifier, project_id }, key) => (
          <ParticipantsListItem
            key={key}
            text={`${key + 1}. ${participant_identifier}`}
            subText={`Project: ${project_id}`}
          />
        ))
      )}
      {inputCards.length > 0 && inputCards.map((item) => item.card)}
    </div>
  );
};
