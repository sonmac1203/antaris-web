import { memo } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import {
  StatusDonutChart,
  AssignmentProgress,
  QuestionList,
} from './components';
import styles from './SummaryTab.module.css';

export const SummaryTab = memo(() => {
  const { surveyData, stopRefreshing, isRefreshing } = useSurvey();
  return (
    <div className='d-flex flex-column gap-4 mb-5'>
      <div className={`d-flex align-items-stretch flex-wrap ${styles.Row}`}>
        <StatusDonutChart />
        <AssignmentProgress />
      </div>
      <div>
        <QuestionList />
      </div>
    </div>
  );
});
