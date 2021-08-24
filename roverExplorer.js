const Rover = require('./rover');
const prompt = require('prompt-sync')();

/**
 * Method to explore with the rover(s) on the plateau
 * @param {string} boardCoordinates OPTIONAL: The upper right coordinates for the board in the form 'x-coordinate y-coordinate'
 */
function redRoverRedRover(boardCoordinates = null) {
  if (boardCoordinates === null) {
    boardCoordinates = boardCoords();
  }
  console.log("Thank you. Let's get started with our first rover.");
  const rover = new Rover(boardCoordinates);
  navigateRover(rover);
  const runAgain = prompt('Do you want to explore with another rover? (y/n) ');
  if (runAgain.toLowerCase() == 'y') {
    const newCoordinates = prompt(
      'Do you want to explore a plateau with different coordinates for the upper right position? (y/n) '
    );
    if (newCoordinates.toLowerCase() == 'y') {
      redRoverRedRover();
    } else {
      redRoverRedRover(boardCoordinates);
    }
    console.log('Thank you for exploring the Mars plateau!');
  }
}

/**
 * Helper method to prompt for the board coordinates
 * @returns {string} Board coordinates
 */
function boardCoords() {
  console.log(
    "Welcome to the rover explorer. We are trying to collect data on the Mars plateau where our rovers have landed. Please provide the coordinates for the upper right corner of the plateau as a string in the form 'x-coordinate y-coordinate' (e.g. 4 5)"
  );
  const boardCoordinates = prompt('Upper left corner of the plateau: ');
  return boardCoordinates;
}

/**
 * Helper method to have the rover navigate based on input instructions
 * @param {Rover} The rover class that has been perivously initialized and will be moving around
 */
function navigateRover(rover) {
  const startingCoords = prompt(
    "Please provide the starting coordinates for the rover in the form 'x-coordinate y-coordinate direction' (e.g. 1 1 N): "
  );
  rover.setPosition(startingCoords);
  const instructions = prompt(
    'Please provide a string of instructions for the rover. The string should consist of L R and M (any other characters will simply be ignored) and not have any spaces (e.g. LLMLLMMR): '
  );
  rover.explore(instructions);
  console.log(
    `After exploring, the rover ended up at ${rover.currentPosition}.`
  );
}

redRoverRedRover();
