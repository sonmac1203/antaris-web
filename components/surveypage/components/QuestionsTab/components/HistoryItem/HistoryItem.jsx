import { ListGroup, Button, ProgressBar } from 'react-bootstrap';
import { formatDate } from '@/core/utils';
import Link from 'next/link';

export const HistoryItem = ({
  data: { assigned_at, progress, notified, last_notified },
}) => {
  const timeOfAssignement = formatDate(new Date(assigned_at));
  const timeOfNotification = notified && formatDate(new Date(last_notified));

  return (
    <ListGroup.Item className='pt-3 px-0 pb-4'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div className='d-flex align-items-center gap-2'>
          <div>
            <i className='fa-regular fa-paper-plane me-1' />
            {timeOfAssignement}
          </div>
          {notified && (
            <>
              ·
              <div>
                <i className='fa-regular fa-bell me-1' />
                {timeOfNotification}
              </div>
            </>
          )}
        </div>
      </div>
      <ProgressBar striped now={progress} label={`${progress}%`} />
    </ListGroup.Item>
  );
};
