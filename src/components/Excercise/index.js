import React from 'react';
import './exercise.css';
import useEventListener from '@use-it/event-listener'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';


const OP_PLUS = '+';
const OP_MINUS = '-';
const OP_MULTI = '×';
const OP_DIV = '÷';
const OPERATORS = [ OP_PLUS, OP_MINUS, OP_MULTI, OP_DIV];
const RANGES = [ 25, 15, 10, 8];

let num1;
let num2;
let op;
let resultStr;
let answer = "";
let isWrong = false;
let isOpAvailable = {
  [OP_PLUS]: true,
  [OP_MINUS]: true,
  [OP_MULTI]: true,
  [OP_DIV]: true
};

const rand = (range) => {
  return Math.floor(Math.random() * range);
}

function calc(num1, num2, op) {
  switch(op) {
    case OP_PLUS:
      return num1 + num2;
    case OP_MINUS:
      return num1 - num2;
    case OP_MULTI:
      return num1 * num2;
    case OP_DIV:
      return num1 / num2;
    default:
      return num1 + num2;
  }
}

function initExercise() {
  let opi;
  do {
    opi = rand(4);
    op = OPERATORS[opi];
  } while (!isOpAvailable[op]);

  const range = RANGES[opi];
  num1 = rand(range);
  num2 = rand(range);

  if (op === OP_MINUS && num2 > num1) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  if (op === OP_DIV) {
    while (num2 === 0) {
      num2 = rand(range);
    }
    num1 = num1 * num2;
  }
  resultStr = calc(num1, num2, op) + "";
  answer = "";
  //console.log('init: ' + num1 + ' ' + op + ' ' + num2);
}

initExercise();

function Exercise(props) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEventListener('keydown', ({key}) => {
    if (key >=0 && key <=9) {
      answer += key
      if (answer === resultStr) {
        setTimeout(() => {
          props.onCorrect();
          initExercise();
          forceUpdate();
        }, 1000);
      } else if (!resultStr.startsWith(answer)) {
        isWrong = true;
        props.onMistake();
        setTimeout(() => {
          answer = "";
          isWrong = false;
          forceUpdate();
        }, 1000);
      }
      forceUpdate();
    }
  });

  const toggleOp = (event) => {
    const operatorsLeft = OPERATORS.filter((op) => isOpAvailable[op]).length;
    const tOp = event.target.name;
    if (operatorsLeft > 1 || !isOpAvailable[tOp]) {
      isOpAvailable[tOp] = !isOpAvailable[tOp];
      if (tOp === op) {
        initExercise();
      }
      forceUpdate();
    }
  };

  return (
    <div className="exercise-wrap">
      <Row>
        <div className="control">
          <ButtonGroup aria-label="Basic example">
            {OPERATORS.map((op, index) => 
                <Button
                  key={op}
                  name={op}
                  variant={isOpAvailable[op] ? "success" : "outline-secondary"}
                  onClick={toggleOp}
                >{op}</Button>
            )}
          </ButtonGroup>
        </div>
      </Row>
      <Row className="exercise">
        <h1>{num1} {op} {num2} = 
          <span className={isWrong ? "wrong" : ""}> {answer}</span>
        </h1>
      </Row>
    </div>
  );
}

export default Exercise;
