import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddTransaction(showTransactionModal, setShowTransactionModal) {
  return (
    <div>
      <Modal show={showTransactionModal}>
        <Form>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
        </Form>
      </Modal>
    </div>
  );
}

export default AddTransaction;
