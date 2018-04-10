var ghost;

function setup () {

  createCanvas(800, 300);

  ghost = createSprite(100, 150, 50, 100);
  
  ghost.addAnimation("floating", "assets/ghost_standing0001.png", "assets/ghost_standing0007.png");
  ghost.addAnimation("moving", "assets/ghost_walk0001.png", "assets/ghost_walk0004.png");
  ghost.addAnimation("spinning", "assets/ghost_spin0001.png", "assets/ghost_spin0003.png");

  TaskModel.setTask()

  setupTaskLabel();

}

function draw () {
  background(200);
  stroke(50);
  fill(100);
  connectToGamePad();
  drawSprites();
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      checkPressed('left');
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

/*
function setupStage() {
  var bug1;
  
}
*/

function checkPressed(value) {
  if (TaskModel.task == value) {
    GhostView.perform('move')
    TaskModel.setTask()
    taskElem.html(`Press ${TaskModel.task}`);
  } else {
    GhostView.perform('move-reverse')
  }
}

/*
function setupScoreLabel() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'green');
}
*/

function setupTaskLabel() {
  taskElem = createDiv(`Press ${TaskModel.task}`);
  taskElem.position(20, 20);
  taskElem.id = 'Task';
  taskElem.style('color', 'green');
}

const GhostView = {
  perform: (action) => {
    switch (action) {
        case 'float':
          ghost.changeAnimation("floating")
          ghost.velocity.x = 0
        break
        case 'move':
          ghost.changeAnimation("moving")
          ghost.mirrorX(1)
          ghost.velocity.x = 2
          setTimeout(() => {
            GhostView.perform('float')
          }, 200)
        break
        case 'move-reverse':
          ghost.changeAnimation("moving")
          ghost.velocity.x = -2
          setTimeout(() => {
            GhostView.perform('float')
          }, 400)
        break
    }
  }
}

const TaskModel = {
  taskList: ['left', 'right', 'up', 'down'],
  task: undefined,
  setTask: () => {
    taskList = TaskModel.taskList
    TaskModel.task = taskList[Math.floor(Math.random() * taskList.length)]
  }
}
