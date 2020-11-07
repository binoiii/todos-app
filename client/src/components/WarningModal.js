import React from "react";
import { Button, Modal } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";

function WarningModal({ handleComplete, handleCancel, show, todo }) {
  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header className="border-bottom-0">
          <Modal.Title className="mx-auto">
            <CheckCircle color="#f0ad4e" size={80} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto my-3 text-center">
          Congratulations{" "}
          <strong style={{ textTransform: "uppercase" }}>{`"${todo}"`}</strong>{" "}
          task completed!
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="outline-secondary rounded" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outline-warning rounded" onClick={handleComplete}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WarningModal;
