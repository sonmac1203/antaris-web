import React from 'react';
import { InputArea } from './components';
import styles from './Homepage.module.css';

export const Homepage = () => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.Header}>Hi dudes,</h1>
      <div className={styles.InputAreaContainer}>
        <InputArea />
      </div>
    </div>
  );
};
