setTitle('Filling "Big Eyes" Last');

var prob =
  '.!O!?' +
  '.!OO!' +
  '.?!O!' +
  '..!OO' +
  '..?!!';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('You\'ve got the hang of it now! Just a few more for practice.' + tapNext, okay, good);
    setAction(next, 'captureBigEye4');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
