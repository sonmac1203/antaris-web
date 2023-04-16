import React from 'react';
import { ListGroup } from 'react-bootstrap';

export const AnswerItem = () => {
  return (
    <ListGroup.Item className='d-flex flex-column'>
      <h5 className='fs-5 fw-normal'>Sunday</h5>
      <div className='d-flex align-items-center gap-1 mb-1'>
        <h6 className='fs-6 fw-normal text-muted m-0'>by Wesley Chiu</h6> ·{' '}
        <h6 className='fs-6 fw-normal text-muted m-0'>2d ago</h6>
      </div>
    </ListGroup.Item>
  );
};
