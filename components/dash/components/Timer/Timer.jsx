import { useEffect } from 'react';
import { useMdhAccessToken } from '@/core/hooks';

const ONE_SECOND = 1000;

export const Timer = ({
  data: { serviceAccountId, projectId, tokenExpiresAt },
}) => {
  const { getTokenAndSaveToSession } = useMdhAccessToken();

  const refreshAccessToken = async () => {
    await getTokenAndSaveToSession(serviceAccountId, projectId);
  };

  useEffect(() => {
    const timeUntilExpiration = Math.ceil(
      (new Date(tokenExpiresAt).getTime() - Date.now()) / 1000
    );
    let counter = timeUntilExpiration;
    const intervalId = setInterval(() => {
      if (counter % 10 === 0) {
        console.log(counter); // just for testing
      }
      if (counter >= -1) {
        counter -= 1;
      } else {
        clearInterval(intervalId);
        refreshAccessToken();
      }
    }, ONE_SECOND);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Timer</div>;
};
