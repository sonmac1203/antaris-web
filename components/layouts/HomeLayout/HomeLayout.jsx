import React from 'react';
import Head from 'next/head';
import { Footer } from '../components';

export const HomeLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antaris | Home</title>
      </Head>
      {children}
      <Footer />
    </>
  );
};
