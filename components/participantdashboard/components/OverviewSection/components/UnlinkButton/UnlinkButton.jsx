import { Button, Modal, Alert, Form } from 'react-bootstrap';
import { UnlinkModal } from '../UnlinkModal';
import { useState } from 'react';

export const UnlinkButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant='link'
        className='p-0'
        style={{ fontSize: '12px' }}
        onClick={handleShow}
      >
        Unlink and delete skill
      </Button>
      <UnlinkModal show={show} onHide={handleClose} />
    </>
  );
};
