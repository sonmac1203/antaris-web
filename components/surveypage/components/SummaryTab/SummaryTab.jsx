import {
  StatusDonutChart,
  AssignmentProgress,
  QuestionList,
} from './components';
import { memo } from 'react';
import styles from './SummaryTab.module.css';

export const SummaryTab = memo(() => {
  return (
    <div className='d-flex flex-column gap-4 mb-5'>
      <div className={`d-flex flex-wrap align-items-stretch ${styles.Row}`}>
        <StatusDonutChart />
        <AssignmentProgress />
      </div>
      <div>
        <QuestionList />
      </div>
    </div>
  );
});
