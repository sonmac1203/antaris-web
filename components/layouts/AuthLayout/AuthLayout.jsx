import React from 'react';
import Head from 'next/head';
import styles from './AuthLayout.module.css';

export const AuthLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antaris | Home</title>
      </Head>
      <main className={styles.Main}>
        <div className={styles.Content}>
          <div className={styles.InnerWrapper}>
            <div>{children}</div>
            <div className={styles.Footer}>
              Capstone 23062 team - 2022 &#10084;&#65039;
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
