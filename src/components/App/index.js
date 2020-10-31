import React, { useState } from "react";
import Confetti from "react-confetti";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaImages } from "react-icons/fa";
import PlayerSelect from "../PlayerSelect";
import Puzzle from "../Puzzle";
import Gallery from "../Gallery";
import { t } from "../../utils/translation";
import { getStorageItem, setStorageItem } from "../../utils/storage";
import "./App.css";

let players = getStorageItem("players", [
  {
    name: "Player1",
    missions: 0,
  },
]);

let IMAGES = getStorageItem(
  "images",
  Array.from({ length: 10 }, (_, i) => "p" + (i + 1) + ".jpg")
);

//console.log("players:", players);
let missionComplete = false;

function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [player, setPlayer] = useState(players[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [images] = useState(getStorageItem("images", IMAGES));

  if (!player.missions) {
    player.missions = 0;
  }

  const handleComplete = () => {
    missionComplete = true;
    if (!player.missions) {
      player.missions = 0;
    }
    player.missions++;
    setStorageItem("players", players);
    forceUpdate();
    setTimeout(() => {
      missionComplete = false;
      forceUpdate();
    }, 8000);
  };

  const handleConfigChange = () => {
    setStorageItem("players", players);
  };

  const handleSwitchPlayer = (name) => {
    setPlayer(players.filter((player) => player.name === name)[0]);
  };

  const handleGalleryClose = () => {
    setShowGallery(false);
  };

  const updateImages = () => {
    console.log("updateImages");
    setStorageItem("images", images);
    forceUpdate();
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="no-padding">
            <span>
              <Button onClick={() => setShowGallery(true)}>
                <FaImages />
              </Button>
            </span>
            <span>
              <PlayerSelect
                players={players}
                player={player}
                onPlayersChange={handleConfigChange}
                onSwitchPlayer={handleSwitchPlayer}
              ></PlayerSelect>
            </span>
          </Col>
          <Col>
            {t("Missions")}: {player.missions || "0"}
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>

        <Puzzle
          player={player}
          images={images}
          onComplete={handleComplete}
          onConfig={handleConfigChange}
        />
      </Container>

      {missionComplete && <Confetti />}

      {showGallery && images && (
        <Gallery
          images={images}
          onUpdate={updateImages}
          onClose={handleGalleryClose}
        />
      )}
    </div>
  );
}

export default App;
