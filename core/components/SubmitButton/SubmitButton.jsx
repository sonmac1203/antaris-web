import { Button } from 'react-bootstrap';

export const SubmitButton = ({ loading, defaultText, loadingText }) => {
  return (
    <Button
      variant='primary'
      type='submit'
      className='w-100 mt-3'
      disabled={loading}
    >
      {!loading ? defaultText : loadingText}
    </Button>
  );
};
