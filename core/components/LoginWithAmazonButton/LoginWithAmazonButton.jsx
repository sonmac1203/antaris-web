import Link from 'next/link';
import styles from './LoginWithAmazonButton.module.css';

export const LoginWithAmazonButton = () => {
  const connectEndpoint = '/api/amazon/connect';
  const buttonText = 'Log in with Amazon';

  const state = {
    chaining: false,
  };

  return (
    <Link
      href={{
        pathname: connectEndpoint,
        query: {
          state: encodeURIComponent(JSON.stringify(state)),
        },
      }}
      className={styles.Style}
    >
      <i className='fa-brands fa-amazon' />
      {buttonText}
    </Link>
  );
};
