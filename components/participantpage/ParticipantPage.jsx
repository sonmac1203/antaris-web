import React from 'react';
import { useParticipant } from '@/core/hooks';
import { PageTitle } from '@/core/components';
import { Accordion } from 'react-bootstrap';
import styles from './ParticipantPage.module.css';

export const ParticipantPage = () => {
  const { participantData, assignedSurveys } = useParticipant();
  const participantName = `${participantData.demographics.firstName} ${participantData.demographics.lastName}`;

  return (
    <div className='core-container'>
      <PageTitle>{participantName}</PageTitle>
      <section className='mt-4'>
        <h5 className='mb-2'>Assigned surveys</h5>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <div className='overflow-hidden text-nowrap'>
                <div className={styles.Title}>NAME 1</div>
                <div className={`d-flex align-items-center ${styles.Footer}`}>
                  4b255081-35b2-ed11-aac4-0afb9334277d
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};
