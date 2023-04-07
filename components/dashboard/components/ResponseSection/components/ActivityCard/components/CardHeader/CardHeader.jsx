import styles from './CardHeader.module.css';
import { dynamicFormatDate } from '@/core/utils';

export const CardHeader = ({ participant, survey, timeProvided }) => {
  const name = participant.demographics.first_name;
  const surveyName = survey.display_name;

  return (
    <div className={`mb-2 align-items-center gap-1 ${styles.Test}`}>
      <div>
        <span className='fw-semibold'>{name}</span>{' '}
        <span className='text-secondary fw-normal'>answered</span>{' '}
        <span className='fw-semibold'>{surveyName}</span>{' '}
      </div>
      ·
      <div className='text-secondary fw-normal'>
        {dynamicFormatDate(timeProvided)}
      </div>
    </div>
  );
};
