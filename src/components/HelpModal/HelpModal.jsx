import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function HelpModal(props) {
  const { show, handleClose } = props;
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="help-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="help-modal">Help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
