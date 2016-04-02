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
            showPopup('Excellent job! ' + tapNext, okay, good);
            setAction(next, 'captureGroup1');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
    case 'J':
    case 'Q':
    case 'T':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
