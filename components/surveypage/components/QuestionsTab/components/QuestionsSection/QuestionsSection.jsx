import { useEffect } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { getFormattedDate } from '@/core/utils';
import { ListGroup, Card } from 'react-bootstrap';
import { QuestionListItem } from '../QuestionListItem';

export const QuestionsSection = () => {
  const { surveyData, stopRefreshing, isRefreshing } = useSurvey();
  const { content } = surveyData;

  const title = content
    ? `Imported on ${getFormattedDate(new Date(content.imported_at))}`
    : 'You have not imported this survey.';

  useEffect(() => {
    stopRefreshing();
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
