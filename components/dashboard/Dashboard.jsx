import {
  SurveySection,
  ParticipantSection,
  ResponseSection,
} from './components';
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
      </div>
      <div className={styles.Right}>
        <ResponseSection />
      </div>
    </div>
  );
};
