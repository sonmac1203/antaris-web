import { Accordion, ListGroup, Badge } from 'react-bootstrap';
import { useParticipant } from '@/lib/re/participantoverview';
import { ResponseItem } from '../ResponseItem';
import styles from './SurveyItem.module.css';

export const SurveyItem = ({ survey: surveyData, eventKey }) => {
  const { participantResponses } = useParticipant();

  const { survey } = surveyData;

  const response = participantResponses.find(
    (res) => res.responded_to.mdh_id === survey.mdh_id
  );

  const questionsAndResponse = survey.content.questions.map((q) => {
    const answer = response?.content.find(
      (item) => item.question_identifier === q.identifier
    );
    return {
      answer: answer || null,
      questionText: q.text,
    };
  });

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <div className='overflow-hidden text-nowrap'>
          <div className='d-flex gap-2 mb-2'>
            <div className={styles.Title}>{survey.display_name}</div>
            <Badge bg={survey.completed ? 'success' : 'secondary'}>
              {survey.completed ? 'complete' : 'incomplete'}
            </Badge>
          </div>
          <div className={`d-flex align-items-center ${styles.Footer}`}>
            {survey.mdh_id}
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body className='px-4 py-0'>
        <ListGroup variant='flush' as='ol' numbered>
          {questionsAndResponse.map((item, key) => (
            <ResponseItem item={item} key={key} />
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};
