import { Button } from 'react-bootstrap';

export const ConnectButton = ({ loading }) => {
  return (
    <Button
      variant='primary'
      type='submit'
      className='w-100'
      disabled={loading}
    >
      {!loading ? 'Connect' : 'Connecting...'}
    </Button>
  );
};
