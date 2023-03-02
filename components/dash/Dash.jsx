import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table, Card, Form, Button } from 'react-bootstrap';

export const Dash = ({ data }) => {
  const router = useRouter();
  const [surveyTasks, setSurveyTasks] = useState([]);

  const { access_token: accessToken, project_id: projectId } = data;

  const [clickedSurveyData, setClickedSurveyData] = useState();

  const onSignOut = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  const onRowClick = (index) => {
    setClickedSurveyData(surveyTasks[index]);
  };

  useEffect(() => {
    (async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { projectId },
      };
      const { data } = await axios.get('/api/mdh/get_surveys', config);
      if (data.success) {
        console.log(data.surveyTasks);
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
                  onRowClick(k);
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
      {surveyTasks.length > 0 && clickedSurveyData && (
        <DetailsCard data={clickedSurveyData} />
      )}
    </>
  );
};

const DetailsCard = ({ data: { surveyName, surveyID, participantID } }) => {
  return (
    <Card style={{ width: '' }}>
      <Card.Body>
        <Card.Title>{surveyName}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          ID: {surveyID}
        </Card.Subtitle>
        <Card.Text>Assigned to: {participantID}</Card.Text>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as='textarea' rows={3} />
            <Form.Text className='text-muted'>
              Enter the JSON template of the survey from MyDataHelps
            </Form.Text>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
