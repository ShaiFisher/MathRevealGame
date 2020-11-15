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
import BouncingImage from "../BouncingImage";
import LanguageSelect from "../LanguageSelect";
import { t } from "../../utils/translation";
import { getStorageItem, setStorageItem } from "../../utils/storage";
import "./App.css";

const PRIZE_MISSIONS = 10;
const CONFETTI_TIMER = 8000;

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
  const [language, setLanguage] = useState(
    getStorageItem("language", navigator.language.substr(0, 2))
  );

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
    if (player.missions % PRIZE_MISSIONS === 0) {
      setShowPrize(true);
    }
    forceUpdate();
    setTimeout(() => {
      missionComplete = false;
      forceUpdate();
    }, CONFETTI_TIMER);
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
    setStorageItem("images", images);
    forceUpdate();
  };

  const handleBouncingClose = () => {
    setShowPrize(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setStorageItem("language", lang);
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
          <Col className="right">
            <LanguageSelect
              language={language}
              onchange={handleLanguageChange}
            ></LanguageSelect>
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
