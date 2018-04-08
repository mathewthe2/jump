function setup() {
  createCanvas(720, 400);
  
  // setupScoreLabel();
  setupTaskLabel();
}
var x = 40;
var speed = 8;
var limit = 500;
var backwards = false;
var TaskElem;
var taskList = ['up', 'down', 'left', 'right'];
var task = taskList[Math.floor(Math.random()*taskList.length)];


function draw() {
  background(200);
  stroke(50);
  fill(100);
  rect(x, 120, 120, 40);
  if ((x < limit && !backwards) || (backwards && x < limit))  {
    x += speed;
    limit = 500;
    backwards = false;
  } else {
    x -= speed;
    limit = 120;
    backwards = true;
  };
    connectToGamePad();
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      checkPressed('left');;
      break;
    case 38:
      checkPressed('up');
      break;
    case 39:
      checkPressed('right');
      break;
    case 40:
      checkPressed('down');
      break;
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function connectToGamePad() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }
  if (gamepads[0] === null) {
    return;
  }
  //switch controller
  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[0])) {
    checkPressed('down');
  } else if (buttonPressed(gp.buttons[1])) {
    checkPressed('right');
  } else if (buttonPressed(gp.buttons[2])) {
    checkPressed('left');
  } else if (buttonPressed(gp.buttons[3])) {
    checkPressed('up');
  } else if (buttonPressed(gp.buttons[4])) {
    checkPressed('L');
  } else if (buttonPressed(gp.buttons[5])) {
    checkPressed('R');
  } 
}

function setupStage() {
  var bug1;
  
}

function checkPressed(value) {
  if (task == value) {
    task = taskList[Math.floor(Math.random()*taskList.length)];
    taskElem.html(`Press ${task}`);
  } else {
    console.log('no');
  }
}

function setupScoreLabel() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'green');
}

function setupTaskLabel() {
  taskElem = createDiv(`Press ${task}`);
  taskElem.position(20, 20);
  taskElem.id = 'Task';
  taskElem.style('color', 'green');
}

//Jitter class
function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}