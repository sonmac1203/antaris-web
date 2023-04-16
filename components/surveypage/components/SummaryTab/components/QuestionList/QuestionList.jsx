import { CompContainer } from '../CompContainer';
import { AnswerItem } from './components';
import { ListGroup } from 'react-bootstrap';
import { useSurvey } from '@/lib/re/surveyoverview';
import { QuestionItem } from './components';

export const QuestionList = () => {
  const { surveyData } = useSurvey();

  const participantIds = surveyData.assigned_to.map(
    (a) => a.participant.participant_identifier
  );

  const questions = surveyData.content.questions;
  const surveyId = surveyData.surveyID;

  return (
    <div className='d-flex flex-column gap-4'>
      {questions.map((q, key) => (
        <QuestionItem
          question={q}
          surveyId={surveyId}
          key={key}
          participantIds={participantIds}
          order={key + 1}
        />
      ))}
    </div>
  );
};
