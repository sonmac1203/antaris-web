import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dash } from '@/components/dash';
import { DashboardLayout } from '@/components/layouts';
import { useCredentials } from '@/core/hooks';
import { getAccessToken } from '@/core/utils/mdh';

const DashPage = () => {
  const router = useRouter();
  const [accountData, setAccountData] = useState();
  const { setAccessToken, setProjectId } = useCredentials();

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
      router.push('/');
      return;
    }

    // Fetch the user's account data and set it in state
    const fetchAccountData = async () => {
      try {
        const { data } = await axios.get('/api/auth/new_auth', {
          headers: { 'x-auth': authToken },
        });
        if (data.success) {
          setAccountData(data.accountData);
          setAccessToken(data.accountData.access_token);
          setProjectId(data.accountData.project_id);
          localStorage.setItem('accessToken', data.accountData.access_token);
          localStorage.setItem('projectId', data.accountData.project_id);
        } else {
          router.push('/');
        }
      } catch (err) {
        router.push('/');
      }
    };
    fetchAccountData();
  }, []);

  useEffect(() => {
    if (!accountData) {
      return;
    }
    const { token_expires_at } = accountData;
    const timeUntilExpiration = Math.ceil(
      (new Date(token_expires_at).getTime() - Date.now()) / 1000
    );

    let counter = timeUntilExpiration;
    const intervalId = setInterval(() => {
      if (counter % 100 === 0) {
        console.log(counter);
      }
      if (counter >= -1) {
        counter -= 1;
      } else {
        clearInterval(intervalId);
        refreshAccessToken();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [accountData]);

  const refreshAccessToken = async () => {
    const { mdh_id: serviceAccountId, project_id: projectId } = accountData;
    const apiResponse = await getAccessToken(serviceAccountId, projectId);
    if (apiResponse.success) {
      localStorage.setItem('auth_token', apiResponse.auth_token);
      router.reload();
    } else {
      router.push('/');
    }
  };

  return accountData && <Dash data={accountData} />;
};

DashPage.Layout = DashboardLayout;

export default DashPage;
