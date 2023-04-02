import { useParticipant } from '@/core/hooks';
import { Accordion } from 'react-bootstrap';
import { SurveyItem } from '../SurveyItem';

export const SurveyList = () => {
  const { assignedSurveys } = useParticipant();

  return (
    <section className='mt-4'>
      <h5 className='mb-2'>Assigned surveys</h5>
      {!assignedSurveys || assignedSurveys.length === 0 ? (
        <>No survey was assigned to this participant.</>
      ) : (
        <Accordion>
          {assignedSurveys.map((survey, key) => (
            <SurveyItem survey={survey} key={key} eventKey={key} />
          ))}
        </Accordion>
      )}
    </section>
  );
};
