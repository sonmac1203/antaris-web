import { useSurvey } from '@/core/hooks';
import { Accordion, ListGroup } from 'react-bootstrap';
import { HistoryItem } from '../HistoryItem';
import { ActionButtons } from '../ActionButtons';
import styles from './ParticipantListItem.module.css';

export const ParticipantListItem = ({ data, eventKey }) => {
  const { surveyData } = useSurvey();
  const { accountEmail, participantIdentifier, demographics, alexa_metadata } =
    data;

  const thisSurvey =
    !alexa_metadata || alexa_metadata.assigned_surveys.length === 0
      ? null
      : alexa_metadata.assigned_surveys.find(
          (item) => item.survey.mdh_id === surveyData.surveyID
        );

  return (
    <Accordion.Item eventKey={eventKey}>
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
      <Accordion.Body className='px-4 py-0'>
        <ListGroup variant='flush'>
          {!alexa_metadata ? (
            <ListGroup.Item className='py-4 px-0'>
              <i className='fa-regular fa-face-frown me-2' />
              This person hasn't signed up with Antaris.
            </ListGroup.Item>
          ) : (
            <>
              {alexa_metadata.assigned_surveys.length === 0 || !thisSurvey ? (
                <ListGroup.Item className='py-4 px-0'>
                  <i className='fa-regular fa-thumbs-up me-2' />
                  Assignments will show up here.
                </ListGroup.Item>
              ) : (
                <HistoryItem
                  data={thisSurvey}
                  participantIdentifier={participantIdentifier}
                />
              )}
              <ActionButtons
                participantIdentifier={participantIdentifier}
                surveySent={thisSurvey !== null}
              />
            </>
          )}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};
