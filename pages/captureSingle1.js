setTitle('Capturing Edge Stones');
setDesc('Capturing against the edge is easier.<br />Give it a try!');

var prob =
  '.!O!.' +
  '.?!?.' +
  '.....' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Great job!' + tapNext, okay, good);
    setAction(next, 'captureSingle2');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
