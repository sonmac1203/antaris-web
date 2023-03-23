import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dash } from '@/components/dash';
import { DashboardLayout } from '@/components/layouts';
import { useCredentials } from '@/core/hooks';
import { getAccessToken } from '@/core/utils/mdh';
import { withSession } from '@/core/utils/session';
import jwtUtils from '@/core/utils/jwt-utils';
import { withSsrAuth } from '@/core/utils/auth';

const DashPage = ({ accountData }) => {
  // const DashPage = () => {
  const router = useRouter();
  // const [accountData, setAccountData] = useState();
  // const { setAccessToken, setProjectId } = useCredentials();

  // const [isLoading, setIsLoading] = useState(false);

  // const loadSurveysFromMdh = useCallback(async () => {
  //   setIsLoading(true);
  // }, []);

  // useEffect(() => {
  //   const authToken = localStorage.getItem('auth_token');
  //   if (!authToken) {
  //     router.push('/');
  //     return;
  //   }

  //   // Fetch the user's account data and set it in state
  //   const fetchAccountData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/auth/new_auth', {
  //         headers: { 'x-auth': authToken },
  //       });
  //       if (data.success) {
  //         setAccountData(data.accountData);
  //         setAccessToken(data.accountData.access_token);
  //         setProjectId(data.accountData.project_id);
  //         localStorage.setItem('accessToken', data.accountData.access_token);
  //         localStorage.setItem('projectId', data.accountData.project_id);
  //       } else {
  //         router.push('/');
  //       }
  //     } catch (err) {
  //       router.push('/');
  //     }
  //   };
  //   fetchAccountData();
  // }, []);

  // useEffect(() => {
  //   if (!accountData) {
  //     return;
  //   }
  //   const { token_expires_at } = accountData;
  //   const timeUntilExpiration = Math.ceil(
  //     (new Date(token_expires_at).getTime() - Date.now()) / 1000
  //   );

  //   let counter = timeUntilExpiration;
  //   const intervalId = setInterval(() => {
  //     if (counter % 100 === 0) {
  //       console.log(counter);
  //     }
  //     if (counter >= -1) {
  //       counter -= 1;
  //     } else {
  //       clearInterval(intervalId);
  //       refreshAccessToken();
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const refreshAccessToken = async () => {
  //   const { mdh_id: serviceAccountId, project_id: projectId } = accountData;
  //   const apiResponse = await getAccessToken(serviceAccountId, projectId);
  //   if (apiResponse.success) {
  //     localStorage.setItem('auth_token', apiResponse.auth_token);
  //     router.reload();
  //   } else {
  //     router.push('/');
  //   }
  // };

  // const accountData = {
  //   serviceAccountId: 'RKStudio.60898E34.alexa',
  //   accessToken:
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjRPbFdwY2JSN3lGZUpVTHVqd1FrOVREWl9UayIsImtpZCI6IjRPbFdwY2JSN3lGZUpVTHVqd1FrOVREWl9UayJ9.eyJpc3MiOiJodHRwczovL2Rlc2lnbmVyLm15ZGF0YWhlbHBzLm9yZy9pZGVudGl0eXNlcnZlciIsImF1ZCI6Imh0dHBzOi8vZGVzaWduZXIubXlkYXRhaGVscHMub3JnL2lkZW50aXR5c2VydmVyL3Jlc291cmNlcyIsImV4cCI6MTY3OTM4ODkxNiwibmJmIjoxNjc5Mzg1MzE2LCJjbGllbnRfaWQiOiJSS1N0dWRpby42MDg5OEUzNC5hbGV4YSIsInN1YiI6ImFkYTA0YzNlLWI3YjctZWQxMS1hYWM0LTBhZmI5MzM0Mjc3ZCIsInVzZXJfbmFtZSI6IlJLU3R1ZGlvLjYwODk4RTM0LmFsZXhhIiwicm9sZXMiOlsiUktTdHVkaW9TZXJ2aWNlQWNjb3VudCIsIlJLLjYwODk4RTM0Il0sInNjb3BlIjoiYXBpIiwianRpIjoiMWMxZTJhMzc2YjBlOGUyZDk2NGNjZjA1NjBjM2RmMmQifQ.eamz8xKeU2gGlY5Ibks2zQTZbSfJnmwtonsD2l_ZyBoVSb2G7bcSX-19Nme__8AAX3DgUVZ8zxUF9jxUey0Ut1eznb53rCTBWo_y_ru2bItXL8IBJ-R2IhIKEGaDlsCx1G3TLibfz4BHolL3j9zTizVamoDPkHwpQOltGJ4Hh3fyN9Z99DHglCE85WplHcCuny1qB7AgD__8U83IC4i5hmIkptpJzs4KRM0UMNZm7YV61ySP25A1lk3x4QdNi9mf8CihXz2jXfmw4MybSw96jvrGR-tF1-1PzCGVixtaUR3uqsnInTvyx1zZYpioJwzWoJmJYz8ATOkZPoBoeMSLRg',
  //   projectId: '7d56a434-9e01-4738-b234-fbec65fe5a83',
  //   tokenExpiresAt: '2023-03-21T08:55:16.040Z',
  // };

  return <Dash data={accountData} />;
};

DashPage.Layout = DashboardLayout;

export default DashPage;

export const getServerSideProps = withSsrAuth(async ({ req }) => {
  const { token } = req.session;
  const accountData = jwtUtils.decode(token);
  return {
    props: { accountData },
  };
});
