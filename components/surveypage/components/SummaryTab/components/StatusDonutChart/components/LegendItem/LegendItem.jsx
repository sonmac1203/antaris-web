import React from 'react';
import styles from './LegendItem.module.css';

export const LegendItem = ({
  text,
  percentage,
  backgroundColor,
  borderColor,
}) => {
  if (percentage === 0) return;

  const bulletStyle = {
    backgroundColor,
    borderColor,
  };

  return (
    <div className='d-flex align-items-center'>
      <div className={`${styles.Bullet} me-2`} style={bulletStyle} />
      <h6 className='fs-6 mb-0 flex-fill'>{text}</h6>
      <h6 className='fs-6 mb-0 text-muted'>{percentage}%</h6>
    </div>
  );
};
