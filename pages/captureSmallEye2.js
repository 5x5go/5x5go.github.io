setTitle('Filling "Eyes" Last');
setDesc('Just one more showing that capture a group with an "eye"');

var prob =
  '!OOO!' +
  '!O!O!' +
  '!OO!?' +
  '?!!?.' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Excellent! Once again, you can "hold your breath" when capturing.' + tapNext, okay, good);
    setAction(next, 'captureBigEye0');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
