import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ConfirmModal from "../ConfirmModal";
import NameModal from "../NameModal";
import { t } from "../../utils/translation";

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
      <DropdownButton
        title={t("Current Player") + ": " + player.name}
        variant="outline-secondary"
      >
        <Dropdown.Item onClick={() => setShowRename(true)}>
          {t("Rename")}
        </Dropdown.Item>
        <Dropdown.Item onClick={confirmRemovePlayer}>
          {t("Remove Player")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setShowAdd(true)}>
          {t("Add Player")}
        </Dropdown.Item>
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

      {showAdd && (
        <NameModal
          show={showAdd}
          title={t("Add Player")}
          onCancel={() => setShowAdd(false)}
          onSave={handleAddSave}
        />
      )}

      {showRename && (
        <NameModal
          title={t("Rename") + " - " + player.name}
          defaultValue={player.name}
          onCancel={() => setShowRename(false)}
          onSave={handleRenameSave}
        />
      )}

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
