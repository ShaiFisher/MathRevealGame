import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ConfirmModal from "../ConfirmModal";
import { t } from "../../utils/translation";

function NameModal({ show, title, defaultValue, onSave, onCancel }) {
  let newName = "";
  const setName = (event) => {
      newName = event.target.value;
  };
  const handleSave = () => onSave(newName);

  return (
    <Modal show={show} onHide={onCancel} className="name-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              type="text"
              placeholder={t("Name")}
              onChange={setName}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {t("OK")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function PlayerSelect({ players, player, onPlayersChange, onSwitchPlayer }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const handleAddSave = (newName) => {
    if (newName) {
      players.push({
        name: newName,
        missions: 0,
      });
      onPlayersChange();
      onSwitchPlayer(newName);
      setShowAdd(false);
    }
  };

  const confirmRemovePlayer = () => {
    if (players.length > 1) {
      setShowRemove(true);
    }
  };

  const removePlayer = () => {
    if (players.length > 1) {
      const i = players.indexOf(player);
      players.splice(i, 1);
      onSwitchPlayer(players[0].name);
      onPlayersChange();
      setShowRemove(false);
    }
  };

  const handleRenameSave = (newName) => {
    if (newName) {
        player.name = newName;
      onPlayersChange();
      setShowRename(false);
    }
  };

  const switchPlayer = (event) => onSwitchPlayer(event.target.name);

  return (
    <span className="inline">
      <DropdownButton title={t("Current Player") + ": " + player.name} variant="outline-secondary">
        <Dropdown.Item onClick={()=>setShowRename(true)}>{t("Rename")}</Dropdown.Item>
        <Dropdown.Item onClick={confirmRemovePlayer}>
          {t("Remove Player")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setShowAdd(true)}>{t("Add Player")}</Dropdown.Item>
        <Dropdown.Divider />
        {players.map((player) => (
          <Dropdown.Item
            key={player.name}
            name={player.name}
            as="button"
            onClick={switchPlayer}
          >
            {player.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <NameModal
        show={showAdd}
        title={t("Add Player")}
        onCancel={() => setShowAdd(false)}
        onSave={handleAddSave}
      />

      <NameModal
        show={showRename}
        title={t("Rename") + " - " + player.name}
        defaultValue={player.name}
        onCancel={() => setShowRename(false)}
        onSave={handleRenameSave}
      />

      <ConfirmModal
        show={showRemove}
        title={t("Remove Player") + " - " + player.name}
        body={t("Are you sure?")}
        onConfirm={removePlayer}
        onCancel={() => setShowRemove(false)}
      />
    </span>
  );
}

export default PlayerSelect;
