import {
  SurveySection,
  ParticipantSection,
  ResponseSection,
} from './components';
import { Footer } from '../layouts/components';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={`core-container flex-nowrap gap-4 ${styles.Container}`}>
      <div className={styles.Left}>
        <section>
          <SurveySection />
        </section>
        <section>
          <ParticipantSection />
        </section>
        <Footer className={styles.HideAtSmall} />
      </div>
      <div className={styles.Right}>
        <section>
          <ResponseSection />
        </section>
        <Footer className={styles.ShowAtSmall} />
      </div>
    </div>
  );
};
