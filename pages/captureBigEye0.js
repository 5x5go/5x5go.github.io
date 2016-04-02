setTitle('Filling "Eyes" Last');

var prob =
  '.cOcc' +
  '.cOOO' +
  '.nccc' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Super! Again, you can "hold your breath" when capturing.' + tapNext, okay, good);
    setAction(next, 'captureBigEye1');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
