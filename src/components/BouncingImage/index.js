import React, { Component } from "react";
import "./BouncingImage.css";

const SLOW_AFTER = 240;
const INTERVAL = 80;
const SHIFT = 10;
const ROCK_SIZE = 300;
const MAX_FRACTION = 4;   // 2,4,8,...
let intervalId;

function getComputedStyle(className) {
  var ele = document.getElementById(className);
  return ele ? window.getComputedStyle(ele) : null;
}

function getWidth(className) {
  const eleStyle = getComputedStyle(className);
  return eleStyle ? removeSuffix(eleStyle.width, 2) : 0;
}

function getHeight(className) {
  const eleStyle = getComputedStyle(className);
  return eleStyle ? removeSuffix(eleStyle.height, 2) : 0;
}

function removeSuffix(str, len) {
  return str.substr(0, str.length - len);
}

function isOutOfRange(pos, screenLength, imageLength) {
  return pos <= 0 || pos >= screenLength - imageLength - 40;
}

class BouncingImage extends Component {
  constructor(props) {
    super(props);
    const rocks = [
      {
        posX: 0,
        posY: 0,
        dirX: 1,
        dirY: 1,
        size: 1,
      },
    ];
    this.state = { currentCount: 0, posX: 0, posY: 0, rocks: rocks };
    this.onEnd = props.onClose;
  }

  moveRocks() {
    // after few intervals, slow movement by half (by skiping half of intervals)
    if (this.state.currentCount > SLOW_AFTER && this.state.currentCount % 2 === 0) {
      this.setState({
        currentCount: this.state.currentCount + 1
      });
      return;
    }
    const screenWidth = getWidth("bnc-screen");
    const screenHeight = getHeight("bnc-screen");
    this.state.rocks.forEach((rock) => {
      rock.posX = rock.posX + SHIFT * rock.dirX;
      rock.posY = rock.posY + SHIFT * rock.dirY;
      if (isOutOfRange(rock.posX, screenWidth, ROCK_SIZE / rock.size)) {
        rock.dirX *= -1;
      }
      if (isOutOfRange(rock.posY, screenHeight, ROCK_SIZE / rock.size)) {
        rock.dirY *= -1;
      }
    });
    this.setState({
      currentCount: this.state.currentCount + 1,
      rocks: this.state.rocks,
    });

    // if element is gone
    if (!getWidth("bnc-screen")) {
      clearInterval(this.intervalId);
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.moveRocks.bind(this), INTERVAL);
    //console.log("set interval:", this.intervalId);
    intervalId = this.intervalId;
  }

  endGame() {
    //console.log("endGame:", this, intervalId);
    clearInterval(intervalId);
    this.onEnd();
  }

  splitRock(index) {
    const rocks = this.state.rocks;
    const rock = rocks[index];
    if (!rock) {
      return;
    }
    //console.log("splitRock:", index, rock.size);
    if (rock.size >= MAX_FRACTION) {
      rocks.splice(index, 1);
      if (rocks.length === 0) {
        this.endGame();
      }
    } else {
      rock.dirY *= -1;
      rock.size *= 2;
      this.state.rocks.push({
        ...rock,
        dirY: rock.dirY * -1,
        dirX: rock.dirX * -1,
      });
    }
  }

  render() {
    return (
      <div className="bouncing-screen" id="bnc-screen">
        {this.state.rocks.map((rock, index) => (
          <div
            key={index}
            className="bouncing-image"
            onClick={() => this.splitRock(index)}
            style={{ top: rock.posY + "px", left: rock.posX + "px" }}
          >
            <img
              src="chocolate.png"
              alt="Chocolate!"
              style={{
                width: ROCK_SIZE / rock.size + "px",
                height: ROCK_SIZE / rock.size + "px",
              }}
            ></img>
          </div>
        ))}
      </div>
    );
  }
}

//module.exports = BouncingImage;
export default BouncingImage;
