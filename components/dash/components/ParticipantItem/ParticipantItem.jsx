import { useRouter } from 'next/router';
import { ListGroup, Badge } from 'react-bootstrap';
import styles from './ParticipantItem.module.css';

export const ParticipantItem = ({ participant }) => {
  const { demographics, participantIdentifier, alexa_metadata } = participant;
  const participantName = `${demographics.firstName} ${demographics.lastName}`;

  const router = useRouter();
  const handleItemClick = () => {
    router.push(`/re/dashboard/participants/${participantIdentifier}`);
  };

  return (
    <ListGroup.Item
      as='li'
      className={`d-flex justify-content-between align-items-start py-3 ${styles.Wrapper}`}
      role='button'
      onClick={handleItemClick}
    >
      <div className={styles.Left}>
        <div className='d-flex align-items-center gap-2 mb-1'>
          <div className={`fs-5 fw-semibold ${styles.Title}`}>
            {participantName}
          </div>
          <div className={`${styles.Subtitle} text-secondary`}>
            {participantIdentifier}
          </div>
          <Badge bg={alexa_metadata ? 'success' : 'secondary'}>
            {alexa_metadata ? 'registered' : 'not registered'}
          </Badge>
        </div>
        {alexa_metadata
          ? getSurveyStatement(alexa_metadata.assigned_surveys.length)
          : 'Assigned surveys will show up here after registering.'}
      </div>
    </ListGroup.Item>
  );
};

function getSurveyStatement(surveyNum) {
  if (surveyNum === 0) return 'No survey was assigned to this participant.';

  return `${surveyNum} ${
    surveyNum > 1 ? 'surveys' : 'survey'
  } assigned to this participant.`;
}
