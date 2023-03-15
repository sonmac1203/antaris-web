import { Form } from 'react-bootstrap';

export const ProjectIdInput = () => {
  return (
    <Form.Group className='mb-3' controlId='projectIdInput'>
      <Form.Label>Project ID</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter project ID from MyDataHelps'
        name='projectId'
      />
    </Form.Group>
  );
};
