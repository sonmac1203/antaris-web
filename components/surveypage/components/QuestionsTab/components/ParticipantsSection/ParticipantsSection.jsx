import { memo } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { Accordion } from 'react-bootstrap';
import { ParticipantListItem } from '../ParticipantListItem';
import { ParticipantsSectionContext } from './context';
import { PageSectionWrapper } from '@/core/components';

export const ParticipantsSection = memo(() => {
  const { participantsData: references, useSelectedParticipants } = useSurvey();
  const participantIds = references.map((p) => p.participantIdentifier);

  const {
    data: participants,
    isLoading: loading,
    error,
    mutate,
  } = useSelectedParticipants(participantIds);

  return (
    <section className='mb-4'>
      <PageSectionWrapper title='Eligible participants'>
        <ParticipantsSectionContext.Provider
          value={{ refreshThisSection: mutate }}
        >
          {error ? (
            <div>There has been an error</div>
          ) : loading ? (
            <div>Loading participants...</div>
          ) : participants.length === 0 ? (
            'No participants found.'
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
      </PageSectionWrapper>
    </section>
  );
});
