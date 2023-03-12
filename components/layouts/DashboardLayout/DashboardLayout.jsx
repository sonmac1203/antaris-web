import React from 'react';
import Head from 'next/head';
import { Footer, Header } from '../components';
import { DashboardProvider } from './provider';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antaris | Dashboard</title>
      </Head>
      <main className={styles.Main}>
        <Header />
        <div className={styles.Content}>
          <DashboardProvider>{children}</DashboardProvider>
        </div>
      </main>
      <Footer />
    </>
  );
};
