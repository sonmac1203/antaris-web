import { Accordion } from 'react-bootstrap';
import { ParticipantHistory } from '../ParticipantHistory';
import styles from './ParticipantListItem.module.css';

export const ParticipantListItem = ({ data }) => {
  const { accountEmail, participantIdentifier, demographics } = data;

  return (
    <Accordion.Item eventKey='0'>
      <Accordion.Header>
        <div className='overflow-hidden text-nowrap'>
          <div className={styles.Title}>
            {demographics.firstName} {demographics.lastName}
          </div>
          <div className={`d-flex align-items-center ${styles.Footer}`}>
            <div>
              <i className='fa-regular fa-envelope me-1' />
              {accountEmail}
            </div>
            ·
            <div className='d-flex align-items-center gap-1'>
              <i className='fa-regular fa-address-card' />
              {participantIdentifier}
            </div>
          </div>
        </div>
      </Accordion.Header>
      <ParticipantHistory />
    </Accordion.Item>
  );
};
