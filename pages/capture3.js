setTitle('Capturing Multiple Stones');
setDesc('Multiple stones connected along the lines are more difficult to capture. Give it a try!');
createBoard();
place(2, 2, white);
place(3, 2, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'H':
    case 'I':
    case 'L':
    case 'O':
    case 'R':
    case 'S':
      // correct points
      switch (++surrounding) {
        case 5:
          mark(2, 2, frown);
          mark(3, 2, frown);
          break;
        case 6:
          capture(2, 2);
          capture(3, 2);
          setTimeout(function () {
            showPopup('Excellent job! Tap "Next" below to continue.', 'Okay!', good);
            setAction('Next', 'capture4');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
    case 'J':
    case 'Q':
    case 'T':
      showPopup('This point is not necessary to capture white. Breating spaces are only along the lines.', 'Got it!', info);
      break;
    default:
      showPopup('Points this far from white are not necessary to capture.', 'Got it!', bad);
      break;
  }
}
