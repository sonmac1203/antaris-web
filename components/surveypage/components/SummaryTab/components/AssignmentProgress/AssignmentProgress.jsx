import React from 'react';
import styles from './AssignmentProgress.module.css';
import { CompContainer } from '../CompContainer';
import { AssignmentItem } from './components';
import { useSurvey } from '@/lib/re/surveyoverview';

export const AssignmentProgress = () => {
  const { surveyData } = useSurvey();
  const assignments = surveyData.assigned_to;
  const participants = assignments.map((a) => {
    const demographics = a.participant.demographics;
    const fullname = `${demographics.first_name} ${demographics.last_name}`;
    const progress = a.progress;
    return {
      fullname,
      progress,
    };
  });

  return (
    <CompContainer title='Progress tracker' subtitle='All time data'>
      <div className={`d-flex flex-column gap-4 my-3 ${styles.Container}`}>
        {participants.map((p, key) => (
          <AssignmentItem
            fullname={p.fullname}
            progress={p.progress}
            key={key}
          />
        ))}
      </div>
    </CompContainer>
  );
};
