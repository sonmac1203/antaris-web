import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.Header}>
      <Link href='/'>
        <i className='fa-solid fa-house' style={{ cursor: 'pointer' }} />
      </Link>
      <div>Antaris - Capstone 23062</div>
      <button>Sign in</button>
    </div>
  );
};
