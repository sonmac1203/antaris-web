import { Form } from 'react-bootstrap';

export const ProjectIdInput = ({ inputRef }) => {
  return (
    <Form.Group className='mb-3' controlId='projectIdInput'>
      <Form.Label>Project ID</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter project ID from MyDataHelps'
        name='projectId'
        ref={inputRef}
      />
    </Form.Group>
  );
};
