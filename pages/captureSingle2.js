setTitle('Capturing Corner Stones');
setDesc('Capturing against the corner is even easier. Give it a try!');

var prob =
  '...!O' +
  '...?!' +
  '.....' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Great job!' + tapNext, okay, good);
    setAction(next, 'captureGroup0');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
