import { Form } from 'react-bootstrap';

export const TextareaField = ({
  label,
  className,
  controlId,
  inputRef,
  placeholder,
  rows,
}) => {
  return (
    <Form.Group className={`mb-3 ${className || ''}`} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as='textarea'
        placeholder={placeholder}
        rows={rows || 4}
        ref={inputRef}
      />
    </Form.Group>
  );
};
