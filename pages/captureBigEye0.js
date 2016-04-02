setTitle('Filling "Eyes" Last');
setDesc('You can place one stone, but not two inside the "eye" unless you\'re capturing');

var prob =
  '.!O!!' +
  '.!OOO' +
  '.?!!!' +
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
