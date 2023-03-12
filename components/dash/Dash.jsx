import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export const Dash = ({ data }) => {
  const router = useRouter();
  const [surveyTasks, setSurveyTasks] = useState([]);

  const { access_token: accessToken, project_id: projectId } = data;

  const onSignOut = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  useEffect(() => {
    (async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { projectId },
      };
      const { data } = await axios.get('/api/mdh/get_surveys', config);
      if (data.success) {
        setSurveyTasks(data.surveyTasks);
      } else {
        setError(true);
      }
    })();
  }, []);

  return (
    <>
      <button onClick={onSignOut}>Sign out</button>
      {surveyTasks.length > 0 && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Survey ID</th>
              <th>Survey Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {surveyTasks.map((s, k) => (
              <tr
                id={k}
                key={k}
                onClick={() => {
                  router.push({
                    pathname: `/dash/surveys/${s.surveyID}`,
                    query: {
                      data: encodeURIComponent(JSON.stringify(s)),
                    },
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>{k}</td>
                <td>{s.surveyID}</td>
                <td>{s.surveyName}</td>
                <td>{s.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
