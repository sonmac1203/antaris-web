import { useContext } from 'react';
import { ParticipantsListItem } from '../ParticipantsListItem';
import { ParticipantSectionContext } from '../../context';
import { CurrentParticipantListSkeleton } from './components';

export const CurrentParticipantsList = () => {
  const { inputCards, currentParticipants, loading, error } = useContext(
    ParticipantSectionContext
  );

  return (
    <div className='d-flex flex-column gap-3'>
      {error ? (
        <ParticipantsListItem text='Could not load participants.' />
      ) : loading ? (
        <>
          <CurrentParticipantListSkeleton />
          <CurrentParticipantListSkeleton />
        </>
      ) : !currentParticipants || currentParticipants.length === 0 ? (
        <ParticipantsListItem text='No participants found.' />
      ) : (
        currentParticipants.map(
          ({ participant_identifier, project_id }, key) => (
            <ParticipantsListItem
              key={key}
              text={`${key + 1}. ${participant_identifier}`}
              subText={`Project: ${project_id}`}
            />
          )
        )
      )}
      {inputCards.length > 0 && inputCards.map((item) => item.card)}
    </div>
  );
};
