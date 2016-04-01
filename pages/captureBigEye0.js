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
        showPopup('Super! Again, you can "hold your breath" when capturing. Tap "Next" below to continue.', 'Okay!', good);
        setAction('Next', 'capture6');
      } else {
        if ((x == 3 && getPoint(4, 0).stone != 'empty') || (x == 4 && getPoint(3, 0).stone != 'empty')) {
          mark(3, 0, frown);
          mark(4, 0, frown);
          setTimeout(function () {
            showPopup('This would be suicide! Your stone would itself have zero breating spaces.', 'Ah, I see!', bad);
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
      showPopup('This point is not necessary to capture white. Breating spaces are only along the lines.', 'Got it!', info);
      break;
    default:
      showPopup('Points this far from white are not necessary to capture.', 'Got it!', bad);
      break;
  }
}
