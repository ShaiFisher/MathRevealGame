import React from 'react';
import Confetti from 'react-confetti'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Puzzle from '../Puzzle';
import './App.css';


let players = JSON.parse(localStorage.getItem("players") || "[]");
if (!players.legth) {
  players.push({
    name: "Shai",
    missions: 0
  });
}
let player = players[0];
let missionComplete = false;


function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

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

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>Player: {player.name}</Col>
          <Col>Missions: {player.missions}</Col>
        </Row>

        <Puzzle onComplete={handleComplete}/>
      </Container>

      {(missionComplete && <Confetti />)}
    </div>
  );
}

export default App;
