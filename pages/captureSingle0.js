setTitle('Capturing Stones');
setDesc("Stones don't move, but may be <i>captured</i>. Try capturing the white stone by surrounding it.");

var prob =
  '.....' +
  '.?!?.' +
  '.!O!.' +
  '.?!?.' +
  '.....';

boardSetup(prob, black);

var surrounding = 0;
function tap(x, y, captured) {
  if (captured) {
    showPopup('Great job!' + tapNext, okay, good);
    setAction(next, 'captureSingle1');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
  switch (xyLetter(x, y)) {
    case 'H':
    case 'L':
    case 'N':
    case 'R':
      // correct points
      switch (++surrounding) {
        case 1:
          showPopup('Nice! This fills one of white\'s "Breating space" along the lines. Keep going...', okay, good);
          break;
        case 3:
          mark(2, 2, frown);
          showPopup('Almost! White is sad with a single "Breating space." You might say "Atari!" - like "Check" in Chess.', okay, good);
          break;
      }
      break;
  }
}
