import { PageSectionWrapper } from '@/core/components';
import { useDashboard } from '@/lib/re/dashboard';
import { SideListItem } from '../SideListItem';
import { Badge, Card } from 'react-bootstrap';

export const ParticipantSection = () => {
  const { participants } = useDashboard();
  return (
    <PageSectionWrapper title='Participants'>
      <Card className='d-flex flex-column gap-3 p-3'>
        {participants
          ? participants.map((p, key) => {
              const href = `/re/dashboard/participants/${p.participantIdentifier}`;
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
      </Card>
    </PageSectionWrapper>
  );
};
