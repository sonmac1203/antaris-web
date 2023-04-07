import { Form } from 'react-bootstrap';

export const DatePicker = ({ className, onChange, defaultValue }) => {
  return (
    <Form.Group controlId='datetimePickerTwo' className={className}>
      <Form.Control
        type='date'
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Form.Group>
  );
};
