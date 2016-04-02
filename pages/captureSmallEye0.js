setTitle('Filling "Eyes" Last');
setDesc('The same shape moved closer to the corner may be a bit more tricky. Try capturing it!');

var prob =
  '..!O!' +
  '..!OO' +
  '..?!!' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Wow, great job! Yes, you can "hold your breath" when capturing.' + tapNext, okay, good);
    setAction(next, 'captureSmallEye1');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
