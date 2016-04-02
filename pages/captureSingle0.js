setTitle('Capturing Stones');
setDesc("Stones don't move, but may be <i>captured</i>. Try capturing the white stone by surrounding it.");
createBoard();
place(2, 2, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
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
        case 4:
          capture(2, 2);
          setTimeout(function () {
            showPopup('Great job!' + tapNext, okay, good);
            setAction(next, 'captureSingle1');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
    case 'I':
    case 'Q':
    case 'S':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
