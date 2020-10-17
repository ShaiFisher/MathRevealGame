import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ConfirmModal from "../ConfirmModal";
import { t } from "../../utils/translation";

function Gallery({ images, onUpdate, onClose }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);

  let newImageUrl;

  const addImage = () => {
    images.push(newImageUrl);
    onUpdate();
  };

  const removeImage = (event) => {
    const i = images.indexOf(event.target.name);
    images.splice(i, 1);
    onUpdate();
  };

  return (
    <Modal show="true" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("Images")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              type="text"
              placeholder={t("Name")}
              onChange={(event) => (newImageUrl = event.target.value)}
            />
            <Button variant="primary" onClick={addImage}>
              {t("Add")}
            </Button>
          </Form.Group>
        </Form>

        {images.map((imageUrl) => (
          <div key={imageUrl}>
            {imageUrl}{" "}
            <Button name={imageUrl} onClick={removeImage}>
              X
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          {t("Close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Gallery;
