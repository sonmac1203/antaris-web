import { useCallback, useEffect } from 'react';
import { useMdh } from '@/core/hooks';
import { useRouter } from 'next/router';
import { Table } from 'react-bootstrap';

export const Dash = () => {
  const { surveys, loading, error, fetchAllSurveys } = useMdh();
  const router = useRouter();

  const loadSurveysFromMdh = useCallback(async () => {
    await fetchAllSurveys();
  }, [fetchAllSurveys]);

  const handleRowClick = (surveyID) => {
    router.push({
      pathname: `/dashboard/surveys/${surveyID}`,
    });
  };

  useEffect(() => {
    loadSurveysFromMdh();
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading ...</div>;
  }

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Survey ID</th>
          <th>Survey Name</th>
          <th>Partcipants</th>
        </tr>
      </thead>
      <tbody>
        {surveys.map((s, k) => (
          <tr
            key={k}
            onClick={() => handleRowClick(s.surveyID)}
            style={{ cursor: 'pointer' }}
          >
            <td>{k}</td>
            <td>{s.surveyID}</td>
            <td>{s.surveyName}</td>
            <td>{s.participants.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
