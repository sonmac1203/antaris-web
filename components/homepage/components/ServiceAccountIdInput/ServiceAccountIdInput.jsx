import { Form } from 'react-bootstrap';

export const ServiceAccountIdInput = ({ inputRef }) => {
  return (
    <Form.Group className='mb-3' controlId='serviceAccountIdInput'>
      <Form.Label>Service Account ID</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter service account ID (from MyDataHelps)'
        name='serviceAccountId'
        ref={inputRef}
      />
      <Form.Text className='text-muted'>
        We'll never share your IDs with anyone else.
      </Form.Text>
    </Form.Group>
  );
};
