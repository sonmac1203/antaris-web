import { useEffect, useContext } from 'react';
import { useSurvey } from '@/core/hooks';
import { SurveyPageContext } from '@/components/surveypage/context';
import { QuestionListItem } from '../QuestionListItem';
import { ListGroup, Card } from 'react-bootstrap';

const formatDate = (date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
  });

export const QuestionsSection = () => {
  const { surveyData } = useSurvey();
  const { content } = surveyData;

  const { setIsRefreshing, isRefreshing } = useContext(SurveyPageContext);

  const title = content
    ? `Imported on ${formatDate(new Date(content.imported_at))}`
    : 'You have not imported this survey.';

  useEffect(() => {
    setIsRefreshing(false);
  }, [surveyData]);

  return (
    <section className='mb-4'>
      {!isRefreshing ? (
        <>
          <h5 className='mb-2'>{title}</h5>
          {content ? (
            <ListGroup as='ol' numbered>
              {content.questions.map((q, k) => (
                <QuestionListItem
                  key={k}
                  title={q.title}
                  description={q.text}
                  footerOne={q.identifier}
                  footerTwo={q.type}
                />
              ))}
            </ListGroup>
          ) : (
            <Card>
              <Card.Body>Your survey will show up here.</Card.Body>
            </Card>
          )}
        </>
      ) : (
        <>Fetching survey questions...</>
      )}
    </section>
  );
};
