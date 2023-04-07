import {
  SurveySection,
  ParticipantSection,
  ResponseSection,
} from './components';
import { ListGroup } from 'react-bootstrap';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className='d-flex core-container flex-nowrap gap-4'>
      <div className={styles.Left}>
        <section>
          <SurveySection />
        </section>
        <div className={styles.Divider} />
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
