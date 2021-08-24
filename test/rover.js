const assert = require('assert');
const Rover = require('../rover');

const rover1 = new Rover('5 5', '1 2 N');
const rover2 = new Rover('5 5', '3 3 E');

describe('Rover', () => {
  // Initial position parsing is working
  describe('Initial Position', () => {
    // Make sure the position input is parsing properly
    describe('Input', () => {
      it('Should return an object with keys `x`, `y`, and `direction`', () => {
        [rover1, rover2].forEach((rover) => {
          assert.equal(
            JSON.stringify(Object.keys(rover.position)),
            JSON.stringify(['x', 'y', 'direction'])
          );
        });
      });
    });

    // Make sure the direction is stored as a cardinal direction string
    describe('Direction', () => {
      it('Should return a number corresponding to a cardinal direction', () => {
        [rover1, rover2].forEach((rover) => {
          assert(['N', 'E', 'S', 'W'].includes(rover.position.direction));
        });
      });
    });

    // Make sure it processed the board as positive integers
    describe('Board', () => {
      it('Should return positive values for the x and y coordinates', () => {
        [rover1, rover2].forEach((rover) => {
          assert(rover.boardCoordinates.x > 0 && rover.boardCoordinates.y > 0);
        });
      });
    });
  });

  // Check that baseline movement patterns work
  describe('Movement', () => {
    describe('Moving', () => {
      it('Rover one should end with a y position of 3 if it moves one from its starting position', () => {
        rover1.move();
        assert.equal(rover1.position.y, 3);
      });
      it('Rover two should end with an x position of 4 if it moves one from the start', () => {
        rover2.move();
        assert.equal(rover2.position.x, 4);
      });
    });
    describe('Turning', () => {
      it('Rover one turning left from its initial position should result in the position being W', () => {
        rover1.turn('L');
        assert.equal(rover1.position.direction, 'W');
      });
      it('Rover two turning right from its initial position should result in the position being S', () => {
        rover2.turn('R');
        assert.equal(rover2.position.direction, 'S');
      });
      it('Either rover receiving a letter other than L or R should not change direction', () => {
        [rover1, rover2].forEach((rover) => {
          const initialDirection = rover.position.direction;
          rover.turn('M');
          assert.equal(rover.position.direction, initialDirection);
        });
      });
    });
  });

  // Check that the rovers end up at the appropriate destination
  describe('Exploration', () => {
    // redifining rovers here because rover1/2 moved in the previous tests
    const rovers = [new Rover('5 5', '1 2 N'), new Rover('5 5', '3 3 E')];
    const instructions = ['LMLMLMLMM', 'MMRMMRMRRM'];
    const destinations = ['1 3 N', '5 1 E'];
    for (let i = 0; i < rovers.length; i++) {
      const rover = rovers[i];
      it(`Rover ${i + 1} should end up at ${
        destinations[i]
      } with instructions ${instructions[i]}`, () => {
        rover.explore(instructions[i]);
        assert.equal(rover.currentPosition, destinations[i]);
      });
    }
  });
});
