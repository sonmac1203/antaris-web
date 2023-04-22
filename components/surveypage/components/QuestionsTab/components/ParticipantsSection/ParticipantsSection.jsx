import { memo } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { ListGroup } from 'react-bootstrap';
import { PageSectionWrapper } from '@/core/components';
import { ParticipantListItem } from '../ParticipantListItem';
import { ParticipantsSectionContext } from './context';

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
            <ListGroup>
              {participants.map((participantData, k) => (
                <ParticipantListItem data={participantData} key={k} />
              ))}
            </ListGroup>
          )}
        </ParticipantsSectionContext.Provider>
      </PageSectionWrapper>
    </section>
  );
});
