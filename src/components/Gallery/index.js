import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import { t } from "../../utils/translation";
import "./gallery.css";
import { FormGroup } from "react-bootstrap";

function Gallery({ images, onUpdate, onClose }) {
  //console.log("Gallery: images:", images);

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
    <Modal show={true} onHide={onClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{t("Images")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <InputGroup className="dir-ltr">
              <Form.Control
                type="text"
                placeholder={t("URL")}
                onChange={(event) => (newImageUrl = event.target.value)}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={addImage}>
                  {t("Add")}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
        </Form>

        <Jumbotron>
          <h3>{t("Random Image Generators")}</h3>
          <p className="dir-ltr">
            https://picsum.photos/800/600 <br/>
            https://source.unsplash.com/800x600<br/>
            https://loremflickr.com/800/600<br/>
            https://loremflickr.com/800/600/dog<br/>
          </p>
        </Jumbotron>

        <CardDeck>
          {images.map((imageUrl) => (
            <Card key={imageUrl} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                <Card.Text>{imageUrl}</Card.Text>
                <Button
                  variant="primary"
                  className="gallery-image-remove"
                  name={imageUrl}
                  onClick={removeImage}
                >
                  X
                </Button>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
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
