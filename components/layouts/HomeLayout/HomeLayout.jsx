import React from 'react';
import Head from 'next/head';
import { Footer, Header } from '../components';
import styles from './HomeLayout.module.css';

export const HomeLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antaris | Home</title>
      </Head>
      <main className={styles.Main}>
        <Header />
        <div className={styles.Content}>{children}</div>
      </main>
      <Footer />
    </>
  );
};
