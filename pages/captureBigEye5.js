setTitle('Filling "Big Eyes" Last');

var prob =
  'O!!!!' +
  'OOOOO' +
  '!!!!!' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Excellent! Just <i>one</i> more for practice.' + tapNext, okay, good);
    setAction(next, 'captureBigEye6');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
