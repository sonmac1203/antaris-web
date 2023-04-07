import { PageSectionWrapper } from '@/core/components';
import { useDashboard } from '@/core/hooks';
import { SideListItem } from '../SideListItem';
import { Badge } from 'react-bootstrap';

export const ParticipantSection = () => {
  const { participants } = useDashboard();
  return (
    <PageSectionWrapper title='Participants'>
      <div className='d-flex flex-column gap-3'>
        {participants
          ? participants.map((p, key) => {
              const href = `/dashboard/participants/${p.participantIdentifier}`;
              const label = `${p.demographics.firstName} ${p.demographics.lastName}`;
              const badge = p.alexa_metadata ? (
                <Badge bg='success'>linked</Badge>
              ) : null;

              return (
                <SideListItem
                  label={label}
                  decorator={badge}
                  key={key}
                  href={href}
                />
              );
            })
          : 'Could not load participants.'}
      </div>
    </PageSectionWrapper>
  );
};