import { useParticipant } from '@/lib/re/participantoverview';
import { PageTitle } from '@/core/components';

export const Header = () => {
  const {
    participantData: { demographics, participantIdentifier },
  } = useParticipant();
  const participantName = `${demographics.firstName} ${demographics.lastName}`;

  return (
    <>
      <PageTitle>{participantName}</PageTitle>
      <div className='d-flex align-items-center gap-2'>
        <div className='d-flex align-items-center gap-1'>
          <i className='fa-regular fa-envelope me-1' />
          {demographics.email}
        </div>
        ·
        <div className='d-flex align-items-center gap-1'>
          <i className='fa-regular fa-address-card me-1' />
          {participantIdentifier}
        </div>
      </div>
    </>
  );
};
