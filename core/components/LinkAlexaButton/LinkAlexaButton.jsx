import Link from 'next/link';
import styles from './LinkAlexaButton.module.css';

export const LinkAlexaButton = () => {
  const connectEndpoint = '/api/amazon/connect';
  const buttonText = 'Link and enable Antaris in my Alexa';

  const state = {
    chaining: true,
    data: {
      email: 'mactranthienson@email.arizona.edu',
      project_id: '7d56a434-9e01-4738-b234-fbec65fe5a83',
      participants: [
        {
          participant_identifier: 'MDH-5747-4140',
          secondary_identifier: '23062',
        },
        {
          participant_identifier: 'MDH-0224-3069',
          secondary_identifier: '23061',
        },
      ],
    },
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
      <img src='/alexa_logos/logo_RGB_white.png' alt='Alexa logo' height='32' />
      {buttonText}
    </Link>
  );
};
