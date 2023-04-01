import { memo, useEffect, useCallback } from 'react';
import { useSurvey, useMdh } from '@/core/hooks';
import { Accordion } from 'react-bootstrap';
import { ParticipantListItem } from '../ParticipantListItem';

export const ParticipantsSection = memo(() => {
  const { participantsData } = useSurvey();

  const participantIds = participantsData.map((p) => p.participantIdentifier);
  const { selectedParticipants, loading, error, fetchSelectedParticipants } =
    useMdh();

  const loadParticipantsFromMdh = useCallback(async () => {
    await fetchSelectedParticipants(participantIds);
  }, [selectedParticipants]);

  useEffect(() => {
    loadParticipantsFromMdh();
  }, []);

  return (
    <section className='mb-4'>
      <h5 className='mb-2'>Eligible participants</h5>
      {error ? (
        <div>There has been an error</div>
      ) : loading || selectedParticipants.length === 0 ? (
        <div>Loading surveys...</div>
      ) : (
        <Accordion>
          {selectedParticipants.map((participantData, key) => (
            <ParticipantListItem data={participantData} key={key} />
          ))}
        </Accordion>
      )}
    </section>
  );
});
