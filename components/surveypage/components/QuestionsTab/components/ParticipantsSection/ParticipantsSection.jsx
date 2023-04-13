import { memo, useEffect, useCallback, useState } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { Accordion } from 'react-bootstrap';
import { ParticipantListItem } from '../ParticipantListItem';
import { ParticipantsSectionContext } from './context';

export const ParticipantsSection = memo(() => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshThisSection = () => setIsRefreshing(!isRefreshing);

  const {
    participantsData: participantReferences,
    loadingParticipants: loading,
    errorParticipants: error,
    selectedParticipants: participants,
    fetchSelectedParticipants,
  } = useSurvey();

  const participantIds = participantReferences.map(
    (p) => p.participantIdentifier
  );

  const loadParticipantsFromMdh = useCallback(async () => {
    await fetchSelectedParticipants(participantIds);
  }, [participantReferences]);

  useEffect(() => {
    loadParticipantsFromMdh();
  }, [isRefreshing]);

  return (
    <section className='mb-4'>
      <h5 className='mb-2'>Eligible participants</h5>
      <ParticipantsSectionContext.Provider value={{ refreshThisSection }}>
        {error ? (
          <div>There has been an error</div>
        ) : loading || participants.length === 0 ? (
          <div>Loading participants...</div>
        ) : (
          <Accordion>
            {participants.map((participantData, k) => (
              <ParticipantListItem
                data={participantData}
                eventKey={k}
                key={k}
              />
            ))}
          </Accordion>
        )}
      </ParticipantsSectionContext.Provider>
    </section>
  );
});
