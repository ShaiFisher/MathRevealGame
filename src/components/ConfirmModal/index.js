import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { t } from "../../utils/translation";

function ConfirmModal({ show, title, body, onConfirm, onCancel }) {
  
    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{t(title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t(body)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            {t("Cancel")}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t("OK")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ConfirmModal;