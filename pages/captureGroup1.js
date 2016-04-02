setTitle('Capturing Multiple Stones');
setDesc('Many shapes are possible. Try capturing this "bent" group of three stones.');
createBoard();
place(2, 2, white);
place(3, 2, white);
place(2, 1, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'C':
    case 'G':
    case 'I':
    case 'L':
    case 'O':
    case 'R':
    case 'S':
      switch (++surrounding) {
        case 6:
          mark(2, 2, frown);
          mark(3, 2, frown);
          mark(2, 1, frown);
          break;
        case 7:
          capture(2, 2);
          capture(3, 2);
          capture(2, 1);
          setTimeout(function () {
            showPopup('Very good job!' + tapNext, okay, good);
            setAction(next, 'captureSmallEye0');
          }, pause);
          done = true;
          break;
      }
      break;
    case 'B':
    case 'D':
    case 'Q':
    case 'T':
    case 'J':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
