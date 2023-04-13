import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@/lib/re/session';

const ONE_SECOND = 1000;

export const SessionRefreshTimer = () => {
  const { asPath } = useRouter();
  const intervalIdRef = useRef(null);
  const { getSessionPayloadAsClient, refreshSessionPayload } = useSession();

  const getPayload = async () => {
    const { payload, role } = await getSessionPayloadAsClient();
    if (!payload) {
      return;
    }

    if (payload && role === 'participant') {
      return;
    }

    const { tokenExpiresAt } = payload;
    const timeUntilExpiration = Math.ceil(
      (new Date(tokenExpiresAt).getTime() - Date.now()) / 1000
    );
    let counter = timeUntilExpiration;
    intervalIdRef.current = setInterval(async () => {
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
