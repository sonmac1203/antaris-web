import { Form } from 'react-bootstrap';

export const VersionSelect = () => {
  return (
    <Form.Group className='mb-3'>
      <Form.Select>
        <option value='1'>Version 1</option>
        <option value='2'>Version 2</option>
        <option value='3'>Version 3</option>
      </Form.Select>
    </Form.Group>
  );
};
