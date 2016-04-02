setTitle('Capturing Corner Stones');
setDesc('Capturing against the corner is even easier.<br />Give it a try!');
createBoard();
place(0, 0, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'B':
    case 'F':
      switch (++surrounding) {
        case 1:
          mark(0, 0, frown);
          break;
        case 2:
          capture(0, 0);
          setTimeout(function () {
            showPopup('Great job!' + tapNext, okay, good);
            setAction(next, 'captureGroup0');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
