import React, { useState } from "react";
import Confetti from "react-confetti";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaImages } from 'react-icons/fa';
import PlayerSelect from "../PlayerSelect";
import Puzzle from "../Puzzle";
import Gallery from "../Gallery";
import { t } from "../../utils/translation";
import "./App.css";

let players = JSON.parse(localStorage.getItem("players") || "[]");
if (!players.length) {
  players.push({
    name: "Player1",
    missions: 0,
  });
} else {
  // temp fix
  players.forEach(player => player.missions = player.missions || player.Missions || 0);
}
//console.log("players:", players);
let missionComplete = false;

function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [player, setPlayer] = useState(players[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState(JSON.parse(localStorage.getItem("images") || "[]"));

  const handleComplete = () => {
    missionComplete = true;
    player.missions++;
    localStorage.setItem("players", JSON.stringify(players));
    forceUpdate();
    setTimeout(() => {
      missionComplete = false;
      forceUpdate();
    }, 8000);
  };

  const handleConfigChange = () => {
    localStorage.setItem("players", JSON.stringify(players));
  };

  const handleSwitchPlayer = (name) => {
    setPlayer(players.filter((player) => player.name === name)[0]);
  };

  const handleGalleryClose = () => {
    localStorage.setItem("players", JSON.stringify(players));
    setShowGallery(false);
  }

  const updateImages = () => {
    console.log("updateImages");
    localStorage.setItem("images", JSON.stringify(images));
    //setImages(images);
    console.log("images:", images);
    forceUpdate();
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <PlayerSelect
              players={players}
              player={player}
              onPlayersChange={handleConfigChange}
              onSwitchPlayer={handleSwitchPlayer}
            ></PlayerSelect>
          </Col>
          <Col>
            {t("Missions")}: {player.missions || "0"}
          </Col>
          <Col>
            <Button onClick={() => setShowGallery(true)}>
              <FaImages />
            </Button>
          </Col>
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

      {showGallery && <Gallery images={images} onUpdate={updateImages} onClose={handleGalleryClose} />}
    </div>
  );
}

export default App;
