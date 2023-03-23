import { useCallback, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useMdh } from '@/core/hooks';
import { useRouter } from 'next/router';

export const Dash = ({ data }) => {
  const { surveys, loading, error, fetchAllSurveys } = useMdh();
  const router = useRouter();

  const loadSurveysFromMdh = useCallback(async () => {
    await fetchAllSurveys();
  }, [fetchAllSurveys]);

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
    <>
      {surveys.length > 0 && (
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
                id={k}
                key={k}
                onClick={() => {
                  router.push({
                    pathname: `/dash/surveys/${s.surveyID}`,
                  });
                }}
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
      )}
    </>
  );
};
