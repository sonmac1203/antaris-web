import {
  StatusDonutChart,
  AssignmentProgress,
  QuestionList,
} from './components';
import { memo } from 'react';
import styles from './SummaryTab.module.css';
import { useSurvey } from '@/lib/re/surveyoverview';

export const SummaryTab = memo(() => {
  const { surveyData } = useSurvey();
  const { assigned_to: assignments } = surveyData;

  return (
    <div className='d-flex flex-column gap-4 mb-5'>
      {!assignments ? (
        'No assignment found.'
      ) : (
        <>
          <div className={`d-flex flex-wrap align-items-stretch ${styles.Row}`}>
            <StatusDonutChart />
            <AssignmentProgress />
          </div>
          <div>
            <QuestionList />
          </div>
        </>
      )}
    </div>
  );
});
