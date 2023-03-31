import { Accordion } from 'react-bootstrap';
import { ParticipantHistory } from '../ParticipantHistory';
import styles from './ParticipantListItem.module.css';

export const ParticipantListItem = () => {
  return (
    <Accordion.Item eventKey='0'>
      <Accordion.Header>
        <div className='overflow-hidden text-nowrap'>
          <div className={styles.Title}>Wesley Chiu</div>
          <div className={`d-flex align-items-center ${styles.Footer}`}>
            <div>
              <i className='fa-regular fa-envelope me-1' />
              wchiu@arizona.edu
            </div>
            ·
            <div className='d-flex align-items-center gap-1'>
              <i className='fa-regular fa-address-card' />
              MDH-5747-4140
            </div>
          </div>
        </div>
      </Accordion.Header>
      <ParticipantHistory />
    </Accordion.Item>
  );
};
