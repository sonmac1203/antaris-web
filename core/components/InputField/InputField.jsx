import { Form } from 'react-bootstrap';

export const InputField = ({
  label,
  className,
  controlId,
  inputRef,
  placeholder,
  type,
}) => {
  return (
    <Form.Group className={`mb-3 ${className || ''}`} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={controlId}
        ref={inputRef}
      />
    </Form.Group>
  );
};
