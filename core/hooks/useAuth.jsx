import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useAuth() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [metadata, setMetadata] = useState(null);

  const router = useRouter();

  const logIn = useCallback(async (serviceAccountId) => {
    const { data: authResult } = await axios.post('/api/auth/get_auth_token', {
      key: serviceAccountId,
    });

    localStorage.setItem('auth_token', authResult.data.authToken);
    router.push('/dash');
  }, []);

  const logOut = useCallback(() => {
    localStorage.clear();
    router.push('/');
  }, []);

  return { logIn, logOut };
}
