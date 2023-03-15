import { Alert, Form } from 'react-bootstrap';
import {
  ProjectIdInput,
  ServiceAccountIdInput,
  ConnectButton,
} from './components';
import { useMdhAccessToken } from '@/core/hooks';

export const Homepage = () => {
  const { loading, error, getTokenAndDoAuth } = useMdhAccessToken();

  const handleConnect = async (event) => {
    event.preventDefault();

    const form = event.target;
    const { value: projectId } = form.elements.projectId;
    const { value: serviceAccountId } = form.elements.serviceAccountId;

    await getTokenAndDoAuth(serviceAccountId, projectId);
  };

  return (
    <div>
      <h3 className='mb-4'>Connect to MyDataHelps account</h3>
      <Form onSubmit={handleConnect}>
        <ProjectIdInput />
        <ServiceAccountIdInput />
        <ConnectButton loading={loading} />
        {!loading && error && (
          <Alert key='alert' variant='danger' className='mt-3'>
            {error.message}
          </Alert>
        )}
      </Form>
    </div>
  );
};
