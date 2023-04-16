import React from 'react';
import { ListGroup, Button, ProgressBar } from 'react-bootstrap';

export const AssignmentItem = () => {
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='fs-6'>Wesley Chiu</h5>
        <h5 className='fs-6 text-muted'>60%</h5>
      </div>
      <ProgressBar now={'60'} style={{ height: '8px' }} />
    </div>
  );
};
