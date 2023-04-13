import Link from 'next/link';
import styles from './LoginWithAmazonButton.module.css';

export const LoginWithAmazonButton = ({ buttonText }) => {
  const connectEndpoint = '/api/dev/amz/connect';

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
      {buttonText || 'Join with your Amazon account'}
    </Link>
  );
};
