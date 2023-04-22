import { useEffect } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { getFormattedDate } from '@/core/utils';
import { ListGroup, Card } from 'react-bootstrap';
import { QuestionListItem } from '../QuestionListItem';
import { QuestionsSectionSkeleton } from './components';
import { PageSectionWrapper } from '@/core/components';

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
        <PageSectionWrapper title={title}>
          {content ? (
            <ListGroup as='ol' numbered>
              {content.questions.map((q, k) => (
                <QuestionListItem
                  key={k}
                  title={q.title}
                  description={q.text}
                  type={q.type}
                />
              ))}
            </ListGroup>
          ) : (
            <Card>
              <Card.Body>Your survey will show up here.</Card.Body>
            </Card>
          )}
        </PageSectionWrapper>
      ) : (
        <QuestionsSectionSkeleton />
      )}
    </section>
  );
};
