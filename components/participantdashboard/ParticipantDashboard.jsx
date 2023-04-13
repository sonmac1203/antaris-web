import { OverviewSection, ParticipantSection } from './components';
import styles from './ParticipantDashboard.module.css';

export const ParticipantDashboard = () => {
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
