import React from 'react';
import styles from './AssignmentProgress.module.css';
import { CompContainer } from '../CompContainer';
import { AssignmentItem } from './components';

export const AssignmentProgress = () => {
  return (
    <CompContainer title='Progress tracker' subtitle='All time data'>
      <div className='d-flex flex-column gap-4 my-3'>
        <AssignmentItem />
        <AssignmentItem />
        <AssignmentItem />
      </div>
    </CompContainer>
  );
};
