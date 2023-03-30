import { ListGroup } from 'react-bootstrap';
import { SurveyItem } from '../SurveyItem';

export const SurveyList = ({ surveys }) => {
  return (
    <ListGroup as='ol'>
      {surveys.map((survey, k) => (
        <SurveyItem key={k} survey={survey} />
      ))}
    </ListGroup>
  );
};
