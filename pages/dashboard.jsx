import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dashboard } from '@/components/dashboard';
import { DashboardLayout } from '@/components/layouts';

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [researcherData, setResearcherData] = useState();
  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      router.push('/');
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/auth', {
          headers: { 'x-auth': localStorage.getItem('auth_token') },
        });
        if (response.data.success) {
          setLoading(false);
          setResearcherData(response?.data.researcher_data);
        } else {
          router.push('/');
        }
      } catch (err) {
        console.log(err.response.data);
        router.push('/');
      }
    })();
  }, []);

  return loading || !researcherData ? (
    <div>Loading ... </div>
  ) : (
    <Dashboard data={researcherData} />
  );
};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
