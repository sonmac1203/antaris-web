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

  const textStyle = {
    fontWeight: '500',
  };

  return (
    <div className='d-flex align-items-center mb-2'>
      <div className={`${styles.Bullet} me-2`} style={bulletStyle} />
      <h6 className='fs-6 mb-0 flex-fill' style={textStyle}>
        {text}
      </h6>
      <h6 className='fs-6 mb-0 text-muted' style={textStyle}>
        {percentage}%
      </h6>
    </div>
  );
};
