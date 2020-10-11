import React from 'react';
import Confetti from 'react-confetti'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Exercise from '../Excercise';
import Puzzle from '../Puzzle';
import './App.css';


const MISSION_POINTS = 2;
let players = JSON.parse(localStorage.getItem("players") || "[]");
console.log("players from storage:", players);
if (!players.legth) {
  players.push({
    name: "Shai",
    missions: 0
  });
}
let player = players[0];
let points = 0;
let missionComplete = false;
let showExcercise = true;


function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleCorrect = () => {
    console.log('handleCorrect', points);
    points++;

    if (points === MISSION_POINTS) {
      missionComplete = true;
      showExcercise = false;
      player.missions++;
      localStorage.setItem("players", JSON.stringify(players));
      setTimeout(() => {
        points = 0;
        missionComplete = false;
        showExcercise = true;
        forceUpdate();
      }, 8000);
    }
    forceUpdate();
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>Player: {player.name}</Col>
          <Col>Missions: {player.missions}</Col>
        </Row>
        <Row>
          <Col>
            {(showExcercise && 
              <Exercise oncorrect={handleCorrect}></Exercise>
            )}
          </Col>
          <Col><Puzzle points={points} /></Col>
        </Row>
      </Container>

      {(missionComplete && <Confetti />)}
    </div>
  );
}

export default App;
