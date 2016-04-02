setTitle('Capturing Multiple Stones');
setDesc('Multiple stones connected along the lines are more difficult to capture. Give it a try!');

var prob =
  '.....' +
  '.?!!?' +
  '.!OO!' +
  '.?!!?' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Excellent job! ' + tapNext, okay, good);
    setAction(next, 'captureGroup1');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
