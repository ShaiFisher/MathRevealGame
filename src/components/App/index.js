import React, { useState } from 'react';
import Confetti from 'react-confetti'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayerSelect from '../PlayerSelect';
import Puzzle from '../Puzzle';
import { t } from '../../utils/translation';
import './App.css';

let players = JSON.parse(localStorage.getItem("players") || "[]");
if (!players.length) {
  players.push({
    name: "Player1",
    missions: 0
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

  const handleComplete = () => {
    missionComplete = true;
    player.missions++;
    localStorage.setItem("players", JSON.stringify(players));
    forceUpdate();
    setTimeout(() => {
      missionComplete = false;
      forceUpdate();
    }, 8000);
  }

  const handleConfigChange = () => {
    localStorage.setItem("players", JSON.stringify(players));
  }

  const handleSwitchPlayer = (name) => {
    setPlayer(players.filter(player => player.name === name)[0]);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>{t("Player")}: {player.name}</Col>
          <Col>{t("Missions")}: {player.missions}</Col>
        </Row>
        <Row>
          <PlayerSelect
            players={players}
            player={player}
            onPlayersChange={handleConfigChange}
            onSwitchPlayer={handleSwitchPlayer}
          ></PlayerSelect>
        </Row>

        <Puzzle 
          player={player}
          onComplete={handleComplete}
          onConfig={handleConfigChange}
        />
      </Container>

      {(missionComplete && <Confetti />)}
    </div>
  );
}

export default App;
