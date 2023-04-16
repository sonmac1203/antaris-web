import React from 'react';
import styles from './LegendItem.module.css';

export const LegendItem = () => {
  return (
    <div className='d-flex align-items-center mb-2'>
      <div className={`${styles.Bullet} me-2 bg-primary`} />
      <h6 className='text-900 fw-semi-bold mb-0' style={{ flex: '1' }}>
        Pending
      </h6>
      <h6 className='text-900 fw-semi-bold mb-0'>52%</h6>
    </div>
  );
};
