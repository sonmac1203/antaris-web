import React from 'react';
import { InputArea } from './components';
import styles from './Dashboard.module.css';

export const Dashboard = ({ data }) => {
  const { name, antaris_id } = data;

  return (
    <>
      <div className={styles.ResearcherDataContainer}>
        <div>
          <b>Name:</b> {name}
        </div>
        <div>
          <b>ID:</b> {antaris_id}
        </div>
      </div>
      <InputArea researcherID={antaris_id} />
    </>
  );
};
