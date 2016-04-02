setTitle('Capturing Edge Stones');
setDesc('Capturing against the edge is easier.<br />Give it a try!');
createBoard();
place(2, 0, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'B':
    case 'H':
    case 'D':
      switch (++surrounding) {
        case 2:
          mark(2, 0, frown);
          break;
        case 3:
          capture(2, 0);
          setTimeout(function () {
            showPopup('Great job!' + tapNext, okay, good);
            setAction(next, 'captureSingle2');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'G':
    case 'I':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
