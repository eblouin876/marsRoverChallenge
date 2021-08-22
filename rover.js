module.exports = class Rover {
  /**
   *
   * @param {string} boardCoordinates A space delimited pair coordinates for the top right corner of the board. Bottom left is considered '0 0'
   * @param {string} position A space delimited sting including the x position, y position, and direction (N, E, S, W) the rover is initially facing
   * @returns Rover object that can turn, move, and explore
   */
  constructor(boardCoordinates, position) {
    const positionAry = position.split(' ');
    if (positionAry.length !== 3) {
      return;
    }
    this.position = {
      x: parseInt(positionAry[0]),
      y: parseInt(positionAry[1]),
      direction: positionAry[2],
    };
    const boardCoordinateAry = boardCoordinates.split(' ');
    this.boardCoordinates = {
      x: parseInt(boardCoordinateAry[0]),
      y: parseInt(boardCoordinateAry[1]),
    };
    this.directions = ['N', 'E', 'S', 'W'];
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
   * Method that tells the rover to follow a set of instructions to move to a new position on the board.
   * Instructions are followed sequentially and any characters other than L, R, and M are ignored
   * @param {string} instructions A string of L, R, and M characters that tell the rover when to move and turn.
   */
  explore(instructions) {
    const instructionAry = instructions.split('');
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
   * Getter method to return the current position
   */
  get currentPosition() {
    return `${this.position.x} ${this.position.y} ${this.position.direction}`;
  }
};
