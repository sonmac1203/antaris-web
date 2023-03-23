import { Alert, Form } from 'react-bootstrap';
import {
  ProjectIdInput,
  ServiceAccountIdInput,
  ConnectButton,
} from './components';
import { useRouter } from 'next/router';

export const Homepage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConnect = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const { value: projectId } = form.elements.projectId;
    const { value: serviceAccountId } = form.elements.serviceAccountId;

    const state = { projectId, serviceAccountId };
    router.push({
      pathname: '/api/mdh/connect',
      query: {
        state: encodeURIComponent(JSON.stringify(state)),
      },
    });
  };

  return (
    <div>
      <h3 className='mb-4'>Connect to MyDataHelps account</h3>
      <Form onSubmit={handleConnect}>
        <ProjectIdInput />
        <ServiceAccountIdInput />
        <ConnectButton loading={loading} />
        {/* {!loading && error && (
          <Alert key='alert' variant='danger' className='mt-3'>
            {error.message}
          </Alert>
        )} */}
      </Form>
    </div>
  );
};
