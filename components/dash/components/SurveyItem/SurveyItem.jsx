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
      onClick={handleItemClick}
    >
      <div className={styles.Left}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Title}>{surveyDisplayName}</div>
          <div className={styles.Subtitle}>{surveyID}</div>
          <Badge bg={status === 'incomplete' ? 'danger' : 'success'}>
            {status}
          </Badge>
        </div>
        {surveyDescription || 'There is no description for this survey.'}
      </div>
      <div className={styles.Right}>Imported at 3:00PM</div>
    </ListGroup.Item>
  );
};
