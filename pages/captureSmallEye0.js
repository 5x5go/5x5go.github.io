setTitle('Filling "Eyes" Last');
setDesc('The same shape moved closer to the corner may be a bit more tricky. Try capturing it!');
createBoard();
place(3, 0, white);
place(3, 1, white);
place(4, 1, white);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'C':
    case 'H':
    case 'N':
    case 'O':
      switch (++surrounding) {
        case 4:
          mark(3, 0, frown);
          mark(3, 1, frown);
          mark(4, 1, frown);
          break;
        case 5:
          break;
      }
      break;
    case 'E':
      if (surrounding == 4) {
        capture(3, 0);
        capture(3, 1);
        capture(4, 1);
        setTimeout(function () {
          showPopup('Wow, great job! Yes, you can "hold your breath" when capturing.' + tapNext, okay, good);
          setAction(next, 'captureSmallEye1');
        }, pause);
        done = true;
      } else {
        mark(4, 0, frown);
        setTimeout(function () {
          showPopup(thisIsSuicide, ahISee, bad);
          setTimeout(function () { capture(4, 0); }, pause * 5);
        }, pause);
      }
      break;
    case 'M':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
