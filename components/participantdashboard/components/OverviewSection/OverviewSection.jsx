import { PageSectionWrapper, LinkAlexaButton } from '@/core/components';
import { useParticipantDashboard } from '@/lib/pa/dashboard';
import styles from './OverviewSection.module.css';
import { Badge } from 'react-bootstrap';
import { UnlinkButton } from './components';

export const OverviewSection = () => {
  const {
    participantData: { name, accountLinked, skillEnabled, email },
  } = useParticipantDashboard();

  const skillIsReady = accountLinked && skillEnabled;

  const getBadge = (condition) => (
    <Badge bg={condition ? 'success' : 'secondary'}>
      {condition ? 'ready' : 'not linked'}
    </Badge>
  );

  return (
    <PageSectionWrapper title='Overview'>
      <div className={`d-flex flex-column gap-3 ${styles.Wrapper}`}>
        <div className='d-flex align-items-center gap-2'>
          <h2 className='fs-5 m-0' style={{ fontWeight: '500' }}>
            {name}
          </h2>
          ·
          <h3 className={`fs-6 m-0 fw-normal text-secondary ${styles.Email}`}>
            {email}
          </h3>
        </div>
        <div className='d-flex flex-column gap-2'>
          <div className='d-flex align-items-center gap-3 mb-2'>
            <h4
              className={`fs-6 fw-normal ${!accountLinked && 'text-muted'} m-0`}
            >
              Account {accountLinked ? 'has been' : 'not'} linked.
            </h4>
            {getBadge(accountLinked)}
          </div>
          <div className='d-flex align-items-center gap-3 mb-2'>
            <h4
              className={`fs-6 fw-normal ${!skillEnabled && 'text-muted'} m-0`}
            >
              Skill {skillEnabled ? 'has been' : 'not'} enabled.
            </h4>
            {getBadge(skillEnabled)}
          </div>
        </div>
        <div>{!skillIsReady ? <LinkAlexaButton /> : <UnlinkButton />}</div>
      </div>
    </PageSectionWrapper>
  );
};
