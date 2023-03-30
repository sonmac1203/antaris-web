import { useEffect, useRef } from 'react';
import { useSession } from '@/core/hooks';
import { useRouter } from 'next/router';

const ONE_SECOND = 1000;

export const SessionRefreshTimer = () => {
  const { asPath } = useRouter();
  const intervalIdRef = useRef(null);
  const { getSessionPayloadAsClient, refreshSessionPayload } = useSession();

  const getPayload = async () => {
    const payload = await getSessionPayloadAsClient();
    if (!payload) {
      return;
    }
    const { tokenExpiresAt } = payload;
    const timeUntilExpiration = Math.ceil(
      (new Date(tokenExpiresAt).getTime() - Date.now()) / 1000
    );
    let counter = timeUntilExpiration;
    intervalIdRef.current = setInterval(async () => {
      if (counter % 3 === 0) {
        console.log(counter); // just for testing
      }
      if (counter >= -1) {
        counter -= 1;
      } else {
        clearInterval(intervalIdRef.current);
        await refreshSessionPayload(asPath);
      }
    }, ONE_SECOND);
  };

  useEffect(() => {
    getPayload();
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [asPath]);

  return null;
};
