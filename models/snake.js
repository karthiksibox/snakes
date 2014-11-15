snake = function () {
  var previousPosArray;
  var posArray = [];
  posArray.push([6, 4]);
  posArray.push([5, 4]);
  var direction = 'right';
  var nextDirection = direction;

  function setDirection(newDirection) {
    var allowedDirections;

    switch (direction) {
    case 'left':
    case 'right':
      allowedDirections = ['up', 'down'];
      break;
    case 'up':
    case 'down':
      allowedDirections = ['left', 'right'];
      break;
    default:
      throw('Invalid direction');
    }
    if (allowedDirections.indexOf(newDirection) > -1) {
      nextDirection = newDirection;
    }
  }

  function drawSection(ctx, position) {
    var x = JS_SNAKE.blockSize * position[0];
    var y = JS_SNAKE.blockSize * position[1];
    ctx.fillRect(x, y, JS_SNAKE.blockSize, JS_SNAKE.blockSize);
  }

  function draw(ctx) {
    ctx.save();
    ctx.fillStyle = '#33a';
    for(var i = 0; i < posArray.length; i++) {
      drawSection(ctx, posArray[i]);
    }
  }

  function checkCollision() {
    var wallCollision = false;
    var snakeCollision = false;
    var head = posArray[0]; //just the head
    var rest = posArray.slice(1); //the rest of the snake
    var snakeX = head[0];
    var snakeY = head[1];
    var minX = 1;
    var minY = 1;
    var maxX = JS_SNAKE.widthInBlocks - 1;
    var maxY = JS_SNAKE.heightInBlocks - 1;
    var outsideHorizontalBounds = snakeX < minX || snakeX >= maxX;
    var outsideVerticalBounds = snakeY < minY || snakeY >= maxY;

    if (outsideHorizontalBounds || outsideVerticalBounds) {
      wallCollision = true;
    }
    //check if the snake head coords overlap the rest of the snake
    snakeCollision = JS_SNAKE.checkCoordinateInArray(head, rest);
    return wallCollision || snakeCollision;
  }

  function advance(apple) {
    //make a copy of the head of the snake otherwise
    //the changes below would affect the head of the snake
    var nextPosition = posArray[0].slice();
    direction = nextDirection;
    switch (direction) {
    case 'left':
      nextPosition[0] -= 1;
      break;
    case 'up':
      nextPosition[1] -= 1;
      break;
    case 'right':
      nextPosition[0] += 1;
      break;
    case 'down':
      nextPosition[1] += 1;
      break;
    default:
      throw('Invalid direction');
    }

    previousPosArray = posArray.slice(); //save previous array
    posArray.unshift(nextPosition);
    if (isEatingApple(posArray[0], apple)) {
      $(JS_SNAKE).trigger('appleEaten', [posArray]);
    }
    else {
      posArray.pop();
    }
  }

  function isEatingApple(head, apple) {
    return JS_SNAKE.equalCoordinates(head, apple.getPosition());
  }

  function retreat() {
    posArray = previousPosArray;
  }
  return {
    draw: draw,
    advance: advance,
    retreat: retreat,
    setDirection: setDirection,
    checkCollision: checkCollision
  };
};

