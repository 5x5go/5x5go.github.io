setTitle('Filling "Big Eyes" Last');
setDesc('Last one of this kind.');

var prob =
  '.!O!.' +
  '.!O!?' +
  '.!OO!' +
  '.?!OO' +
  '..?!!';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Super! Now on to more difficult ones!' + tapNext, okay, good);
    setAction(next, 'captureFalseEyes0');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
