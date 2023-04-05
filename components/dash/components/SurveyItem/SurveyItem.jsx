import { useRouter } from 'next/router';
import { ListGroup, Badge } from 'react-bootstrap';
import styles from './SurveyItem.module.css';

export const SurveyItem = ({
  survey: { surveyDescription, surveyID, surveyDisplayName, content, status },
}) => {
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/dashboard/surveys/${surveyID}`);
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
            {surveyDisplayName}
          </div>
          <div className={`${styles.Subtitle} text-secondary`}>{surveyID}</div>
          <Badge bg={status === 'incomplete' ? 'danger' : 'success'}>
            {status}
          </Badge>
        </div>
        {surveyDescription || 'There is no description for this survey.'}
      </div>
    </ListGroup.Item>
  );
};
