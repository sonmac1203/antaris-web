import React from 'react';
import styles from './CompContainer.module.css';

export const CompContainer = ({ children, title, subtitle, className }) => {
  return (
    <div className={`${styles.Container} ${className} card `}>
      <h3 className='fs-5'>{title}</h3>
      {subtitle && (
        <h4 className='text-secondary' style={{ fontSize: '13px' }}>
          {subtitle}
        </h4>
      )}
      {children}
    </div>
  );
};
