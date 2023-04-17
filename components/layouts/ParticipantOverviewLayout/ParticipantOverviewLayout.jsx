import Head from 'next/head';
import { Footer, Header } from '../components';
import styles from './ParticipantOverviewLayout.module.css';

export const ParticipantOverviewLayout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>Antaris | Participant</title>
      </Head>
      <Header user={user} />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </>
  );
};
