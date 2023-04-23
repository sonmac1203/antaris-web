import { getRelativeTime } from '@/core/utils';
import { Badge } from 'react-bootstrap';
import styles from './CardHeader.module.css';
import Link from 'next/link';

export const CardHeader = ({ participant, survey, timeProvided }) => {
  const name = participant.demographics.first_name;
  const surveyName = survey.display_name;
  const participantHref = `/re/dashboard/participants/${participant.participant_identifier}`;
  const surveyHref = `/re/dashboard/surveys/${survey.mdh_id}`;
  const relativeTime = getRelativeTime(timeProvided);
  const recentlyResponded =
    relativeTime === 'Just now' ||
    (relativeTime.endsWith('m ago') &&
      parseInt(relativeTime.split('m ago')[0]) <= 10);

  return (
    <div className='mb-2 align-items-center gap-1 d-flex w-100'>
      <div
        className={`d-flex align-items-center ${styles.Wrapper}`}
        style={{ columnGap: '0.3rem' }}
      >
        <Link
          href={participantHref}
          className={`text-decoration-none text-black ${styles.Link}`}
        >
          <span className='fw-semibold'>{name}</span>
        </Link>
        <span className='text-secondary fw-normal'>answered</span>
        <Link
          href={surveyHref}
          className={`text-decoration-none text-black ${styles.Link}`}
          style={{
            textOverflow: 'ellipsis',
            maxWidth: 'fit-content',
            overflow: 'hidden',
          }}
        >
          <span className='fw-semibold'>{surveyName}</span>
        </Link>
      </div>
      <div className={styles.Timestamp}>
        ·<div className='text-secondary fw-normal'>{relativeTime}</div>
      </div>
      {recentlyResponded && (
        <Badge pill bg='danger' className='ms-1'>
          new
        </Badge>
      )}
    </div>
  );
};
