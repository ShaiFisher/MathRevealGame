import React from 'react';
import './exercise.css';
import useEventListener from '@use-it/event-listener'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import { t } from '../../utils/translation';
import { calc, rand } from '../../utils/math';


const OP_PLUS = '+';
const OP_MINUS = '-';
const OP_MULTI = '×';
const OP_DIV = '÷';
const RANGES = [ 5, 10, 20, 50 ];
const OPERATORS_DEFAULTS = [
  {
    char: OP_PLUS,
    enabled: true,
    range: 50,
    calc: (num1, num2) => num1 + num2
  },
  {
    char: OP_MINUS,
    enabled: true,
    range: 20,
    calc: (num1, num2) => num1 - num2
  },
  {
    char: OP_MULTI,
    enabled: true,
    range: 10,
    calc: (num1, num2) => num1 * num2
  },
  {
    char: OP_DIV,
    enabled: true,
    range: 5,
    calc: (num1, num2) => num1 / num2
  }
];

let num1;
let num2;
let operators = OPERATORS_DEFAULTS;
let op = operators[0]; // curren operator objet
let resultStr;
let answer = "";
let isWrong = false;
let currentPlayerName;

function initExercise() {
  //console.log('initExercise:', operators);
  do {
    const opi = rand(operators.length);
    op = operators[opi];
  } while (!op.enabled);

  num1 = rand(op.range);
  num2 = rand(op.range);

  if (op.char === OP_MINUS && num2 > num1) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  if (op.char === OP_DIV) {
    while (num2 === 0) {
      num2 = rand(op.range);
    }
    num1 = num1 * num2;
  }
  resultStr = calc(num1, num2, op.char) + "";
  answer = "";
  //console.log('init: ' + num1 + ' ' + op.char + ' ' + num2);
}

initExercise();

function Exercise({
  player, onCorrect, onMistake, onUpdatePlayer
}) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  if (player.name !== currentPlayerName) {
    if (player.operators) {
      operators = player.operators;
    } else {
      player.operators = OPERATORS_DEFAULTS;
      onUpdatePlayer();
    }
    currentPlayerName = player.name;
    initExercise();
  }

  useEventListener('keydown', ({key}) => {
    if (key >=0 && key <=9) {
      answer += key
      if (answer === resultStr) {
        setTimeout(() => {
          onCorrect();
          initExercise();
          forceUpdate();
        }, 1000);
      } else if (!resultStr.startsWith(answer)) {
        isWrong = true;
        onMistake();
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
    const operatorsLeft = operators.filter((op) => op.enabled).length;
    const opChar = event.target.name[0];
    const opObj = operators.filter(op => op.char === opChar)[0];
    const range = event.target.name.substring(1);
    
    if (range === "x") {  // toggle
      if (operatorsLeft > 1 || !opObj.enabled) {
        opObj.enabled = !opObj.enabled;
      }
    } else {
      opObj.range = parseInt(range);
      opObj.enabled = true;
    }
    //console.log("toggleOp", opChar, range, opObj);
    initExercise();
    onUpdatePlayer();
    forceUpdate();
  };

  return (
    <div className="exercise-wrap">
      <Row>
        <div className="control">
          <ButtonGroup aria-label="Basic example">
            {operators.map((op, index) => 
              <DropdownButton
                id="dropdown-item-button"
                key={op.char}
                title={op.char}
                variant={op.enabled ? "success" : "outline-secondary"}
              >
                <Dropdown.Item 
                    as="button"
                    name={op.char + "x"}
                    onClick={toggleOp}
                >{t("Toggle")}
                </Dropdown.Item>
                <Dropdown.Divider />
                {RANGES.map(range => 
                  <Dropdown.Item 
                    key={range}
                    as="button"
                    active={op.range === range}
                    name={op.char + range}
                    onClick={toggleOp}
                  >{range}</Dropdown.Item>
                )}
              </DropdownButton>
            )}
            </ButtonGroup>
        </div>
      </Row>
      <Row className="exercise">
        <h1>{num1} {op.char} {num2} = 
          <span className={isWrong ? "wrong" : ""}> {answer}</span>
        </h1>
      </Row>
    </div>
  );
}

export default Exercise;
