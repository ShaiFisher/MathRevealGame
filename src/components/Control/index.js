import React from 'react';
import './exercise.css';
import useEventListener from '@use-it/event-listener'

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
  const opi = rand(4);
  op = OPERATORS[opi];

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
  console.log('init: ' + num1 + ' ' + op + ' ' + num2);
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
          props.oncorrect();
          initExercise();
          forceUpdate();
        }, 1000);
      } else if (!resultStr.startsWith(answer)) {
        isWrong = true;
        setTimeout(() => {
          answer = "";
          isWrong = false;
          forceUpdate();
        }, 1000);
      }
      forceUpdate();
    }
  });

  return (
    <div className="exercise">
      <h1>{num1} {op} {num2} = 
        <span className={isWrong ? "wrong" : ""}> {answer}</span>
      </h1>
    </div>
  );
}

export default Exercise;
