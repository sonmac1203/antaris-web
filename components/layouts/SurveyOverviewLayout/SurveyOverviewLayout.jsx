import Head from 'next/head';
import { Footer, Header } from '../components';
import styles from './SurveyOverviewLayout.module.css';

export const SurveyOverviewLayout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>Antaris | Survey</title>
      </Head>
      <Header user={user} />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </>
  );
};
