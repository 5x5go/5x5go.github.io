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
            showPopup('Great job! Tap "Next" below to continue.', 'Okay!', good);
            setAction('Next', 'captureGroup0');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
      showPopup('This is not necessary to capture white. Remember, breating spaces are only along the lines.', 'Got it!', info);
      break;
    default:
      showPopup('Points this far from white are not necessary to capture.', 'Got it!', bad);
      break;
  }
}
