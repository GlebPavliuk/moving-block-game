const myBody = document.querySelector("body");
const myBlock = document.createElement("div");
const myHeader = document.querySelector("header");

myHeader.style.position = "absolute";

myBody.style.display = "flex";
myBody.style.alignItems = "center";
myBody.style.justifyContent = "center";
myBody.style.height = 100 + "vh";
myBody.style.width = 100 + "vw";
myBody.style.overflow = "hidden";
myBody.style.margin = 0;

myBlock.style.width = 100 + "px";
myBlock.style.height = 100 + "px";
myBlock.style.background = "blue";
myBlock.style.position = "relative";
myBlock.style.transition = 1 + "s";

myBody.append(myBlock);

let isJumping = false;
let myStep = 20;
let maxOffSetLeft = (windowWidth = window.innerWidth) => windowWidth - myBlock.offsetWidth;
let maxOffSetTop = (windowHeight = window.innerHeight) => windowHeight - myBlock.offsetHeight;

const myJump = (e) => {
  if (isJumping) return;
  if (e.code === "Space") {
    let blockBottomPosition = myBlock.style.bottom;
    let timerUpId = setInterval(() => {
      myBlock.style.bottom = parseInt(myBlock.style.bottom || "0") + 20 + "px";
      if (parseInt(myBlock.style.bottom || "0") > parseInt(blockBottomPosition || "0") + 200) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(() => {
          if (parseInt(blockBottomPosition || "0") == parseInt(myBlock.style.bottom || "0")) {
            clearInterval(timerDownId);
            isJumping = false;
            myBlock.style.bottom = parseInt(myBlock.style.bottom || "0") + 20 + "px";
          }
          myBlock.style.bottom = parseInt(myBlock.style.bottom || "0") - 20 + "px";
        }, 100);
      }
      isJumping = true;
    }, 50);
  }
};

const moveRight = (e) => {
  if (e.code === "ArrowRight") {
    let nextOffSetRight = myBlock.offsetLeft + myStep;
    if (nextOffSetRight > maxOffSetLeft()) {
      myBlock.style.left = `${parseInt(myBlock.style.left) - myStep * 2}px`;
      BEMS();
    } else {
      myBlock.style.left = `${parseInt(myBlock.style.left || "0") + myStep}px`;
    }
  }
};

const moveLeft = (e) => {
  if (e.code === "ArrowLeft") {
    let nextOffSetLeft = myBlock.offsetLeft - myStep;
    if (nextOffSetLeft <= 0) {
      myBlock.style.left = `${parseInt(myBlock.style.left) + myStep * 2}px`;
      BEMS();
    } else {
      myBlock.style.left = `${parseInt(myBlock.style.left || "0") - myStep}px`;
    }
  }
};

const moveDown = (e) => {
  if (isJumping) return;
  if (e.code === "ArrowDown") {
    let nextOffSetBottom = myBlock.offsetTop + myStep;
    if (nextOffSetBottom > maxOffSetTop()) {
      myBlock.style.bottom = `${parseInt(myBlock.style.bottom) + myStep * 2}px`;
      BEMS();
    } else {
      myBlock.style.bottom = `${parseInt(myBlock.style.bottom || "0") - myStep}px`;
    }
  }
};

const moveTop = (e) => {
  if (isJumping) return;
  if (e.code === "ArrowUp") {
    let nextOffSetTop = myBlock.offsetTop - myStep;
    if (nextOffSetTop <= 0) {
      myBlock.style.bottom = `${parseInt(myBlock.style.bottom) - myStep * 2}px`;
      BEMS();
    } else {
      myBlock.style.bottom = `${parseInt(myBlock.style.bottom || "0") + myStep}px`;
    }
  }
};

const blockSit = (e) => {
  if (e.code === "ControlLeft") {
    if (myBlock.style.width == 100 + "px") {
      myBlock.style.transition = 1 + "s";
      myBlock.style.height = 50 + "px";
      myBlock.style.width = 125 + "px";
    } else {
      myBlock.style.transition = 0.5 + "s";
      myBlock.style.height = 100 + "px";
      myBlock.style.width = 100 + "px";
    }
  }
};

const BEMS = () => {
  myHeader.innerHTML = `<h1>BOOM!</h1>`;
  setTimeout(() => {
    myHeader.innerHTML = ``;
  }, 2000);
};

const handler = (e) => {
  myBlock.style.transition = "none";
  let myKeyCode = e.code;
  switch (myKeyCode) {
    case "ArrowLeft":
      moveLeft(e);
      break;
    case "ArrowRight":
      moveRight(e);
      break;
    case "ArrowUp":
      moveTop(e);
      break;
    case "ArrowDown":
      moveDown(e);
      break;
    case "ControlLeft":
      blockSit(e);
      break;
    case "Space":
      myJump(e);
      break;
  }
};

document.onkeydown = handler;

window.onresize = () => {
  maxOffSetLeft(window.innerWidth);
  maxOffSetTop(window.innerHeight);
};
