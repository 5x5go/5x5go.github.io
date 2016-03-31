setTitle('Filling "Eyes" Last');
setDesc('');
createBoard();

var prob =
  '..O..' +
  '..OOO' +
  '.....' +
  '.....' +
  '.....';

var key =
  '.C*EE' +
  '.C***' +
  '.NCCC' +
  '.....' +
  '.....';

boardSetup(prob);

var done = false;
var surrounding = 0;
function tap(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (boardSample(x, y, key)) {
    case 'C':
      if (++surrounding == 6)
        eachPoint(prob, 'O', function(x, y) { mark(x, y, frown); });
      break;
    case 'E':
      if (++surrounding == 6) {
        eachPoint(prob, 'O', function(x, y) { mark(x, y, frown); });
      } else {
        // TODO: suicide?
      }
      break;
    case 'N':
      showPopup('This point is not necessary to capture white. Breating spaces are only along the lines.', 'Got it!', info);
      break;
    default:
      showPopup('Points this far from white are not necessary to capture.', 'Got it!', bad);
      break;
  }
}
