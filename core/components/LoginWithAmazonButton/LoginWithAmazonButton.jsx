import Link from 'next/link';
import styles from './LoginWithAmazonButton.module.css';

export const LoginWithAmazonButton = () => {
  const connectEndpoint = '/api/amazon/connect';
  const buttonText = 'Log in with Amazon';

  return (
    <Link
      href={{
        pathname: connectEndpoint,
        query: { auth_type: 'lwa' },
      }}
      className={styles.Style}
    >
      <i className='fa-brands fa-amazon' />
      {buttonText}
    </Link>
  );
};
