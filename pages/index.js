import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Homepage } from '@/components/homepage';
import { HomeLayout } from '@/components/layouts';

const Home = ({ data }) => {
  console.log(data);
  return <Homepage />;
};

Home.Layout = HomeLayout;

export default Home;
