setTitle('Filling "Eyes" Last');
setDesc('You can only place a stone in the "eye" when capturing');

var prob =
  '.!O!O' +
  '.!OOO' +
  '.?!!!' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Wonderful! Again, you can "hold your breath" when capturing.' + tapNext, okay, good);
    setAction(next, 'captureBigEye0');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
