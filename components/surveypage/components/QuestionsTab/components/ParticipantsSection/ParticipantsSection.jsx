import { memo, useEffect, useCallback, useState } from 'react';
import { useSurvey, useMdh } from '@/core/hooks';
import { Accordion } from 'react-bootstrap';
import { ParticipantListItem } from '../ParticipantListItem';
import { ParticipantsSectionContext } from './context';

export const ParticipantsSection = memo(() => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshThisSection = () => setIsRefreshing(!isRefreshing);

  const { participantsData } = useSurvey();

  const participantIds = participantsData.map((p) => p.participantIdentifier);
  const { selectedParticipants, loading, error, fetchSelectedParticipants } =
    useMdh();

  const loadParticipantsFromMdh = useCallback(async () => {
    await fetchSelectedParticipants(participantIds);
  }, [selectedParticipants]);

  useEffect(() => {
    loadParticipantsFromMdh();
  }, [isRefreshing]);

  return (
    <section className='mb-4'>
      <h5 className='mb-2'>Eligible participants</h5>
      <ParticipantsSectionContext.Provider value={{ refreshThisSection }}>
        {error ? (
          <div>There has been an error</div>
        ) : loading || selectedParticipants.length === 0 ? (
          <div>Loading participants...</div>
        ) : (
          <Accordion>
            {selectedParticipants.map((participantData, k) => (
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
