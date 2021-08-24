module.exports = class Rover {
  /**
   *
   * @param {string} boardCoordinates A space delimited pair coordinates for the top right corner of the board. Bottom left is considered '0 0'. Defaults to '1 1'
   * @param {string} position A space delimited sting including the x position, y position, and direction (N, E, S, W) the rover is initially facing. Defaults to '0 0 N'
   * @returns Rover object that can turn, move, and explore
   */
  constructor(boardCoordinates = '1 1', position = '0 0 N') {
    this.directions = ['N', 'E', 'S', 'W'];
    this.setBoardCoordinates(boardCoordinates);
    this.setPosition(position);
  }

  /**
   * Method that sets the position of the rover. Gets called upon construction but can also be called separately.
   * @param {string} position A space delimited sting including the x position, y position, and direction (N, E, S, W) the rover is initially facing.
   */
  setPosition(position) {
    const positionAry = position.split(' ');
    if (positionAry.length !== 3) {
      throw `Position must be in the form 'x-coordinate y-coordinate direction'. You provided: ${position}`;
    }

    const x = parseInt(positionAry[0]);
    const y = parseInt(positionAry[1]);
    const direction = positionAry[2].toUpperCase();

    if (isNaN(x) || isNaN(y)) {
      throw `The x and y coordinates provided must be numbers. You provided x:${positionAry[0]} y:${positionAry[1]}`;
    } else if (!this.directions.includes(direction)) {
      throw `The direction provided must be a cardinal direction (N S W E). You provided: ${direction}`;
    } else if (x > this.boardCoordinates.x || x < 0) {
      throw `The x coordinate must be between 0 and ${this.boardCoordinates.x}. You provided: ${x}`;
    } else if (y > this.boardCoordinates.y || y < 0) {
      throw `The y coordinate must be between 0 and ${this.boardCoordinates.y}. You provided: ${y}`;
    }
    this.position = { x: x, y: y, direction: direction };
  }

  /**
   * Method that sets the board coordinates for the rover. Gets called upon construction but can also be called separately.
   * @param {string} boardCoordinates A space delimited pair coordinates for the top right corner of the board. Bottom left is considered '0 0'
   */
  setBoardCoordinates(boardCoordinates) {
    const boardCoordinateAry = boardCoordinates.split(' ');
    if (boardCoordinateAry.length !== 2) {
      throw `The coordinates for the upper right corner of the board must be in the form 'x-coordinate y-coordinate'. You provided: ${boardCoordinates}`;
    }

    const x = parseInt(boardCoordinateAry[0]);
    const y = parseInt(boardCoordinateAry[1]);

    if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
      throw `The x and y coordinates provided must be numbers greater than or equal to zero. You provided x:${boardCoordinateAry[0]} y:${boardCoordinateAry[1]}`;
    }
    this.boardCoordinates = { x: x, y: y };
  }

  /**
   * Method that tells the rover to follow a set of instructions to move to a new position on the board.
   * Instructions are followed sequentially and any characters other than L, R, and M are ignored
   * @param {string} instructions A string of L, R, and M characters that tell the rover when to move and turn.
   */
  explore(instructions) {
    const instructionAry = instructions.toUpperCase().split('');
    for (let i = 0; i < instructionAry.length; i++) {
      const instruction = instructionAry[i];
      if (instruction === 'M') {
        this.move();
      } else if (['L', 'R'].includes(instruction)) {
        this.turn(instruction);
      }
    }
  }

  /**
   * Method for telling the rover to turn either right or left.
   * @param {string} direction A single letter, either R or L, that tells the rover which direction to travel and updates this.position.direction to reflect
   */
  turn(direction) {
    const currentDirection = this.directions.indexOf(this.position.direction);
    if (direction === 'L') {
      // So instead of subtracting 1 here, we're adding 3. Since the modulo is base 4, this is the same thing as subtracting 1 but avoids problems with negatives
      this.position.direction = this.directions[(currentDirection + 3) % 4];
    } else if (direction === 'R') {
      this.position.direction = this.directions[(currentDirection + 1) % 4];
    }
  }

  /**
   * Method that tells the rover to move in the direction it is currently facing
   * Will not allow the rover to move past the edge of the board
   */
  move() {
    switch (this.position.direction) {
      case 'N':
        if (this.position.y < this.boardCoordinates.y) {
          this.position.y++;
        }
        break;
      case 'S':
        if (this.position.y > 0) {
          this.position.y--;
        }
        break;
      case 'W':
        if (this.position.x > 0) {
          this.position.x--;
        }
        break;
      case 'E':
        if (this.position.x < this.boardCoordinates.x) {
          this.position.x++;
        }
        break;
    }
  }

  /**
   * Getter method to return the current position
   */
  get currentPosition() {
    return `${this.position.x} ${this.position.y} ${this.position.direction}`;
  }
};
