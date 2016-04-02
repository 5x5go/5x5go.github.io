setTitle('Capturing Multiple Stones');
setDesc('Many shapes are possible. Try capturing this "bent" group of three stones.');

var prob =
  '.?!?.' +
  '.!O!?' +
  '.!OO!' +
  '.?!!?' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Very good job!' + tapNext, okay, good);
    setAction(next, 'captureSmallEye0');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
