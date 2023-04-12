import { Modal, Button, Alert, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAmazon } from '@/core/hooks';
import { useRouter } from 'next/router';

const STATEMENT = 'I want to unlink and delete Antaris';

export const UnlinkModal = ({ show, onHide }) => {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState('');

  const notAllowed = !confirmation || confirmation !== STATEMENT;

  const {
    error,
    loading,
    success,
    unlinkAndDeleteSkill,
    resetStates: resetRequestStates,
  } = useAmazon();

  const handleCloseModal = () => {
    setConfirmation('');
    resetRequestStates();
    onHide();
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmation(e.target.value);
  };

  const handleDelete = async () => {
    await unlinkAndDeleteSkill();
  };

  const refreshPage = () => router.replace(router.asPath);

  useEffect(() => {
    if (success || error) {
      const timeoutId = setTimeout(() => {
        handleCloseModal();
        if (success) {
          refreshPage();
        }
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [success, error]);

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Unlink and delete Antaris</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='danger'>
          You are about to unlink and delete Antaris
        </Alert>
        <Form.Group className='mb-3' controlId='actionConfirmation'>
          <Form.Label>
            Please type <b>I want to unlink and delete Antaris</b> to
            continue...
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Deleting...'
            onChange={handleConfirm}
          />
        </Form.Group>
        {error && <Alert variant='danger'>{error.message}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant='danger'
          onClick={handleDelete}
          disabled={notAllowed || loading || success}
        >
          {loading ? 'Deleting' : success ? 'Deleted' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
