import { ProgressBar } from 'react-bootstrap';

export const AssignmentItem = ({ fullname, progress }) => {
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='fs-6'>{fullname}</h5>
        <h5 className='fs-6 text-muted'>{progress}%</h5>
      </div>
      <ProgressBar now={progress} style={{ height: '8px' }} striped />
    </div>
  );
};
