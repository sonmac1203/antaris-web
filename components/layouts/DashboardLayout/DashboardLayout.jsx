import React from 'react';
import Head from 'next/head';
import { Footer, Header } from '../components';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antaris | Dashboard</title>
      </Head>
      <Header />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </>
  );
};
