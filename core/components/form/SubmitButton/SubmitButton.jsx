import React from 'react';
import styles from './SubmitButton.module.css';

export const SubmitButton = ({ text, color, callback, disabled }) => {
  const style = {
    backgroundColor: color,
  };
  return (
    <button
      className={styles.Button}
      onClick={callback}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
};
