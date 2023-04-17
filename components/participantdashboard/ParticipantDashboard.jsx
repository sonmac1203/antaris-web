import { OverviewSection, ParticipantSection } from './components';
import { Footer } from '../layouts/components';
import styles from './ParticipantDashboard.module.css';

export const ParticipantDashboard = () => {
  return (
    <div className={`core-container flex-nowrap gap-4 ${styles.Container}`}>
      <div className={styles.Left}>
        <section>
          <OverviewSection />
        </section>
        <Footer className={styles.HideAtSmall} />
      </div>
      <div className={styles.Right}>
        <section>
          <ParticipantSection />
        </section>
        <Footer className={styles.ShowAtSmall} />
      </div>
    </div>
  );
};
