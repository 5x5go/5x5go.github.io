setTitle('Filling "Big Eyes" Last');

var prob =
  '.!O!.' +
  '.!O!!' +
  '.!OOO' +
  '.?!!!' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('You have this down now! Just a couple more for practice.' + tapNext, okay, good);
    setAction(next, 'captureBigEye5');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
