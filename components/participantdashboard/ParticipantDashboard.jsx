import { LinkAlexaButton } from '@/core/components';
import { OverviewSection, ParticipantSection } from './components';
import { useParticipantDashboard } from '@/core/hooks';
import styles from './ParticipantDashboard.module.css';

export const ParticipantDashboard = () => {
  const {
    participantData: { name, accountLinked, skillEnabled },
  } = useParticipantDashboard();
  const skillIsReady = accountLinked && skillEnabled;

  // return (
  //   <div className='core-container'>
  //     <a href='/api/auth/sign_out'>
  //       <button>Sign out</button>
  //     </a>
  //     <h1>Hi {name}</h1>
  //     <h3>Your account has {accountLinked ? 'already' : 'not'} been linked</h3>
  //     <h3>Your skill has {skillEnabled ? 'already' : 'not'} been enabled</h3>
  //     {!skillIsReady ? (
  //       <LinkAlexaButton />
  //     ) : (
  //       <div>Delete the skill and unlink your account</div>
  //     )}
  //   </div>
  // );

  return (
    <div className={`core-container flex-nowrap gap-4 ${styles.Container}`}>
      <div className={styles.Left}>
        <section>
          <OverviewSection />
        </section>
      </div>
      <div className={styles.Right}>
        <ParticipantSection />
      </div>
    </div>
  );
};
