setTitle('Filling "Eyes" Last');
setDesc('');
createBoard();

var prob =
  '.cOee' +
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
      if (++surrounding == 6)
        eachPoint(prob, 'O', function(x, y) { mark(x, y, frown); });
      break;
    case 'e':
      if (++surrounding == 6) {
        eachPoint(prob, 'O', function(x, y) { mark(x, y, frown); });
      } else if (surrounding == 7) {
        eachPoint(prob, 'O', capture);
        showPopup('Super! Again, you can "hold your breath" when capturing.' + tapNext, okay, good);
        setAction(next, 'captureBigEye1');
      } else {
        if ((x == 3 && getPoint(4, 0).stone != 'empty') || (x == 4 && getPoint(3, 0).stone != 'empty')) {
          mark(3, 0, frown);
          mark(4, 0, frown);
          setTimeout(function () {
            showPopup(thisIsSuicide, ahISee, bad);
            setTimeout(function () {
              mark(3, 0, nomark);
              mark(4, 0, nomark);
              capture(x, y);
              surrounding--;
            }, pause * 5);
          }, pause);
        }
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
