import Link from 'next/link';
import styles from './LinkAlexaButton.module.css';

export const LinkAlexaButton = () => {
  const connectEndpoint = '/api/amazon/connect';
  const buttonText = 'Link and enable Antaris in my Alexa';

  return (
    <Link
      href={{
        pathname: connectEndpoint,
        query: { auth_type: 'alexa' },
      }}
      className={styles.Style}
    >
      <img src='/alexa_logos/logo_RGB_white.png' alt='Alexa logo' height='32' />
      {buttonText}
    </Link>
  );
};
