import { Card, Form } from 'react-bootstrap';
import styles from './ParticipantsListItem.module.css';

export const ParticipantsListItem = ({
  text,
  participantRef,
  projectRef,
  subText,
}) => {
  const participantIdInput = participantRef && (
    <Form>
      <Form.Group className='mb-3' controlId='participantIdInput'>
        <Form.Label>Participant identifier</Form.Label>
        <Form.Control
          type='text'
          placeholder='e.g. MDH-1234-5678'
          ref={participantRef}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='projectIdInput'>
        <Form.Label>Project Id</Form.Label>
        <Form.Control
          type='text'
          placeholder='e.g. this-is-an-invalid-project-id'
          ref={projectRef}
        />
      </Form.Group>
    </Form>
  );
  return (
    <Card>
      <Card.Body className='d-flex flex-column'>
        {!participantRef ? text : participantIdInput}
        <span className='text-secondary mt-2' style={{ fontSize: '14px' }}>
          {subText}
        </span>
      </Card.Body>
    </Card>
  );
};
