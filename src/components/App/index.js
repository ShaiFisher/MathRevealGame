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
import BouncingImage from "../BouncingImage";

const PRIZE_MISSIONS = 10;
const CONFETTI_TIMER = 8000;
const PRIZE_TIMER = 16000;

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
  const [showPrize, setShowPrize] = useState(false);

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
    let timer = CONFETTI_TIMER;
    if (player.missions % PRIZE_MISSIONS === 0) {
      setShowPrize(true);
      timer = PRIZE_TIMER;
    }
    forceUpdate();
    setTimeout(() => {
      missionComplete = false;
      setShowPrize(false);
      forceUpdate();
    }, timer);
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

  const handleBouncingClose = () => {
    setShowPrize(false);
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

      {showPrize && (
        <BouncingImage onClose={handleBouncingClose}></BouncingImage>
      )}

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
