import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { getAccessToken } from '@/core/utils/mdh';
import { useRouter } from 'next/router';

export const Homepage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const projectId = e.target[0].value;
    const serviceAccountId = e.target[1].value;
    const apiResponse = await getAccessToken(serviceAccountId, projectId);
    if (apiResponse.success) {
      localStorage.setItem('auth_token', apiResponse.token);
      router.push('/dash');
    } else {
      setAlertMessage(apiResponse.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className='mb-4'>Connect to MyDataHelps account</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId='projectIdInput'>
          <Form.Label>Project ID</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter project ID from MyDataHelps'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='serviceAccountIdInput'>
          <Form.Label>Service Accound ID</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter service account ID (from MyDataHelps)'
          />
          <Form.Text className='text-muted'>
            We'll never share your IDs with anyone else.
          </Form.Text>
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='w-100'
          disabled={loading}
        >
          {!loading ? 'Connect' : 'Connecting...'}
        </Button>
        {!loading && alertMessage && (
          <Alert key='alert' variant='danger' className='mt-3'>
            {alertMessage}
          </Alert>
        )}
      </Form>
    </div>
  );
};
