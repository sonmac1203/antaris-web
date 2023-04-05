import React from 'react';
import Head from 'next/head';
import { Footer, Header } from '../components';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>Antaris | Dashboard</title>
      </Head>
      <Header user={user} />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </>
  );
};
