import { useRef } from 'react';
import { useMdh } from '@/core/hooks';
import { Alert, Form } from 'react-bootstrap';
import {
  ProjectIdInput,
  ServiceAccountIdInput,
  ConnectButton,
} from './components';

export const Homepage = () => {
  const { loading, error, loginToServiceAccount } = useMdh();

  const projectIdRef = useRef(null);
  const serviceAccountIdRef = useRef(null);

  const handleConnect = async (event) => {
    event.preventDefault();
    const credentials = {
      projectId: projectIdRef.current.value,
      serviceAccountId: serviceAccountIdRef.current.value,
    };
    await loginToServiceAccount(credentials);
  };

  return (
    <div>
      <h3 className='mb-4'>Connect to MyDataHelps account</h3>
      <Form onSubmit={handleConnect}>
        <ProjectIdInput inputRef={projectIdRef} />
        <ServiceAccountIdInput inputRef={serviceAccountIdRef} />
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
