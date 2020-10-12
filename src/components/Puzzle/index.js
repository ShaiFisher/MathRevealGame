import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Exercise from '../Excercise';
import './puzzle.css';

let showExcercise = true;
const BG_NUM = 5;
const ROWS = 4;
const COLS = 6;
const MISSION_POINTS = ROWS * COLS;
let points = 0;
let cells = [...Array(ROWS)].map(x=>Array(COLS).fill(false));
let bgImage;

const rand = (range) => {
  return Math.floor(Math.random() * range);
}

function revealCell() {
    let row = rand(ROWS);
    let col = rand(COLS);
    while (cells[row][col]) {
        row = rand(ROWS);
        col = rand(COLS);
    }
    cells[row][col] = true;
}

function initPuzzle() {
    for (let i=0; i<ROWS; i++) {
        cells[i].fill(false);
    }
    const oldImage = bgImage;
    do {
        bgImage = "bg" + (rand(BG_NUM) + 1) + ".jpg";
    } while (bgImage === oldImage);
}



function Puzzle(props) {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    if (points === 0) {
        initPuzzle();
    }

    const handleCorrect = () => {
        points++;
        revealCell();

        if (points === MISSION_POINTS) {
            showExcercise = false;
            props.onComplete();
            setTimeout(() => {
                points = 0;
                showExcercise = true;
                forceUpdate();
            }, 8000);
        }
        forceUpdate();
    };

    return (
        <Row>
          <Col>
            {(showExcercise && 
              <Exercise oncorrect={handleCorrect}></Exercise>
            )}
          </Col>
          <Col xs={7}>
            <div className="puzzle">
                <img src={bgImage} alt="background" className="bg" />
                <table cellSpacing="0" className="cells">
                    <tbody>
                        {cells.map((row, index) =>
                            <tr key={index}>
                                {row.map((isRevealed, index) => 
                                    <td key={index} className={isRevealed ? "revealed" : ""}>{isRevealed}</td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </Col>
        </Row>
        
    );
}

export default Puzzle;
