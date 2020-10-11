import React from 'react';
import './puzzle.css';

const BG_NUM = 5;
const ROWS = 4;
const COLS = 6;
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

function Puzzle(props) {

    console.log('puzzle points:', props.points);

    if (props.points === 0) {
        console.log("init cells", cells);
        points = props.points;
        for (let i=0; i<ROWS; i++) {
            cells[i].fill(false);
        }
        const oldImage = bgImage;
        do {
            bgImage = "bg" + (rand(BG_NUM) + 1) + ".jpg";
        } while (bgImage === oldImage);
    }

    if (props.points > points) {
        console.log('reveal!');
        points = props.points;
        revealCell();
    }

    return (
        <div className="puzzle">
            <img src={bgImage} alt="background" className="bg" />
            <table cellSpacing="0">
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
    );
}

export default Puzzle;
