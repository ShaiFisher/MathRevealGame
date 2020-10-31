import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { t } from "../../utils/translation";

class NameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.defaultValue };
    this.show = props.show;
    this.title = props.title;
    this.onSave = props.onSave;
    this.onCancel = props.onCancel;

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSave(event) {
    event.preventDefault();
    this.onSave(this.state.value);
  }

  render() {
    return (
      <Modal
        show={true}
        onHide={this.onCancel}
        className="name-modal"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder={t("Name")}
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancel}>
            {t("Cancel")}
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            {t("OK")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NameModal;
