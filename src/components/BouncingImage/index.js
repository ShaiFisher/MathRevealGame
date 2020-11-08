import React, { Component } from "react";
import "./BouncingImage.css";

const COUNT_DOWN = 240;
const INTERVAL = 80;
const SHIFT = 10;
let dirX = 1;
let dirY = 1;
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
    this.state = { currentCount: COUNT_DOWN, posX: 0, posY: 0 };
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1,
      posX: this.state.posX + SHIFT * dirX,
      posY: this.state.posY + SHIFT * dirY,
    });
    /*console.log("X:", this.state.posX, getWidth("bouncing-screen"));
    console.log("Y:", this.state.posY, getHeight("bouncing-screen"));
    console.log(
      "Image dim:",
      getWidth("bouncing-image"),
      getHeight("bouncing-image")
    );*/
    if (
      isOutOfRange(
        this.state.posX,
        getWidth("bnc-screen"),
        getWidth("bnc-image")
      )
    ) {
      dirX *= -1;
    }
    if (
      isOutOfRange(
        this.state.posY,
        getHeight("bnc-screen"),
        getHeight("bnc-image")
      )
    ) {
      dirY *= -1;
    }
    console.log("interval:", this.intervalId, this.state.currentCount);
    // if countdown done or element is gone
    if (this.state.currentCount < 1 || !getWidth("bnc-screen")) {
      clearInterval(this.intervalId);
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), INTERVAL);
    console.log("set interval:", this.intervalId);
    intervalId = this.intervalId;
  }

  stopAnimation() {
    console.log("stopAnimation:", this, intervalId);
    clearInterval(intervalId);
  }

  render() {
    return (
      <div className="bouncing-screen" id="bnc-screen">
        <div
          id="bnc-image"
          className="bouncing-image"
          onClick={this.stopAnimation}
          style={{ top: this.state.posY + "px", left: this.state.posX + "px" }}
        >
          <img src="chocolate.png" alt="Chocolate!"></img>
        </div>
      </div>
    );
  }
}

//module.exports = BouncingImage;
export default BouncingImage;
