import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Shake from "react-reveal/HeadShake";
import Exercise from "../Excercise";
import { rand } from "../../utils/math";
import "./puzzle.css";
import { Button } from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";

const ROWS = 4;
const COLS = 6;
const MISSION_POINTS = ROWS * COLS;
let points = 0;
let cells = [...Array(ROWS)].map((x) => Array(COLS).fill(false));

function revealCell() {
  let row = rand(ROWS);
  let col = rand(COLS);
  while (cells[row][col]) {
    row = rand(ROWS);
    col = rand(COLS);
  }
  cells[row][col] = true;
}

function Puzzle({ player, images, onComplete, onConfig }) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [image, setImage] = useState(images[rand(images.length)]);
  const [showExcercise, setShowExcercise] = useState(true);
  const [isMistake, setIsMistake] = useState(true);

  const initPuzzle = () => {
    for (let i = 0; i < ROWS; i++) {
      cells[i].fill(false);
    }
  };

  if (points === 0) {
    initPuzzle();
  }

  const replaceImage = () => {
    setImage(images[rand(images.length)]);
  }

  const handleCorrect = () => {
    points++;
    revealCell();

    if (points === MISSION_POINTS) {
      setShowExcercise(false);
      onComplete();
      setTimeout(() => {
        points = 0;
        setShowExcercise(true);

        setImage(""); // reload image (for random generators)
        setTimeout(() => {
          replaceImage();
        }, 1000);
      }, 8000);
    }
    forceUpdate();
  };

  const handleMistake = () => {
    setIsMistake(true);
    setTimeout(() => {
      setIsMistake(false);
    }, 1000);
  };

  return (
    <Row>
      <Col>
        {showExcercise && (
          <Exercise
            player={player}
            onCorrect={handleCorrect}
            onMistake={handleMistake}
            onUpdatePlayer={onConfig}
          ></Exercise>
        )}
      </Col>
      <Col xs={7} className="no-padding">
        <div align="right" className="btn-reload">
          <Button onClick={replaceImage} variant="dark">
            <BiRefresh />
          </Button>
        </div>
        <Row className="puzzle">
          <Shake when={isMistake}>
            <img src={image} alt="background" className="bg" />

            <table cellSpacing="0" className="cells">
              <tbody>
                {cells.map((row, index) => (
                  <tr key={index}>
                    {row.map((isRevealed, index) => (
                      <td key={index} className={isRevealed ? "revealed" : ""}>
                        {isRevealed}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Shake>
        </Row>
      </Col>
    </Row>
  );
}

export default Puzzle;
