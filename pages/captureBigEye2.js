setTitle('Filling "Big Eyes" Last');

var prob =
  '!O!!!' +
  '!OOOO' +
  '?!!!!' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Wonderful! Pretty easy isn\'t it.' + tapNext, okay, good);
    setAction(next, 'captureBigEye3');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
