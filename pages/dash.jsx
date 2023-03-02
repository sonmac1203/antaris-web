import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dash } from '../components/dash';
import { DashboardLayout } from '@/components/layouts';

const DashPage = () => {
  const router = useRouter();
  const [accountData, setAccountData] = useState();

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      router.push('/');
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/new_auth', {
          headers: { 'x-auth': localStorage.getItem('auth_token') },
        });
        if (data.success) {
          setAccountData(data.accountData);
        } else {
          router.push('/');
        }
      } catch (err) {
        router.push('/');
      }
    })();
  }, []);

  return accountData && <Dash data={accountData} />;
};

DashPage.Layout = DashboardLayout;

export default DashPage;
