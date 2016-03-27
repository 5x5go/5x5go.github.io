setTitle('Capturing Stones');
setDesc("Stones don't move, but may be <i>captured</i>. Try capturing the white stone by surrounding it.");
createBoard();
place(2, 2, white);

var surrounding = 0;
function tap(x, y) {
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
          showPopup('Nice! This fills one of white\'s "Liberties" along the lines. Keep going...', 'Okay!', good);
          break;
        case 3:
          mark(2, 2, frown);
          showPopup('Almost! White is sad with a single "liberty." You might say "Atari!" - like "Check" in Chess.', 'Okay!', good);
          break;
        case 4:
          capture(2, 2);
          setTimeout(function () {
            showPopup('Great job! Tap "Next" below to continue.', 'Okay!', good);
            setAction('Next', 'capture1');
          }, 1000);
          break;
      }
      break;
    case 'G':
    case 'I':
    case 'Q':
    case 'S':
      showPopup('This point is not necessary to capture white. Liberties are only along the lines.', 'Got it!', info);
      break;
    default:
      showPopup('Points this far from white are not necessary to capture.', 'Got it!', bad);
      break;
  }
}
