setTitle('Filling "Eyes" Last');
createBoard();

var prob =
  '.cOeO' +
  '.cOOO' +
  '.nccc' +
  '.....' +
  '.....';

boardSetup(prob);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (boardSample(x, y, prob)) {
    case 'c':
      if (++surrounding == 5)
        eachPoint(prob, 'O', function(x, y) { mark(x, y, frown); });
      break;
    case 'e':
      if (surrounding == 5) {
        eachPoint(prob, 'O', capture);
        showPopup('Wonderful! Again, you can "hold your breath" when capturing.' + tapNext, okay, good);
        setAction(next, 'captureBigEye0');
      } else {
        mark(x, y, frown);
        setTimeout(function () {
          showPopup(thisIsSuicide, ahISee, bad);
          setTimeout(function () { capture(x, y); }, pause * 5);
        }, pause);
      }
      break;
    case 'n':
      showPopup(unnecessary, gotIt, info);
      break;
    default:
      showPopup(farAway, gotIt, bad);
      break;
  }
}
