// TODO: This is no longer used!

setTitle('Placing Stones');
setDesc('Try placing some stones on the board');
createBoard();

var firstDone = false;
var sideDone = false;
var cornerDone = false;
var sidePrompted = false;
var cornerPrompted = false;
var count = 0;
var toMove = black;
var completed = false;
function tap(x, y, captured) {
  function checkComplete() {
    if (!completed && firstDone && sideDone && cornerDone) {
      setAction(next, 'captureSingle0');
      showPopup('Excellent! You have it.' + tapNext, okay, good);
      completed = true;
      return;
    }
  }
  if (promptIfNonEmpty(x, y)) return checkComplete();
  place(x, y, toMove);
  toMove = opposite(toMove);
  var xside = x == 0 || x == 4;
  var yside = y == 0 || y == 4;
  var side = xside || yside;
  var corner = xside && yside;
  var prefix = '';
  if (corner && !cornerDone) {
    if (!cornerPrompted)
      showPopup('Yep, you can play in the corners too.', gotIt, info);
    else prefix = 'Great! ';
    cornerDone = true;
    return checkComplete();
  } else if (side && !sideDone) {
    if (!sidePrompted)
      showPopup('Yep, you can play on the edge of the board too.', gotIt, info);
    else prefix = 'Great! ';
    sideDone = true;
    return checkComplete();
  } else if (!firstDone) {
    showPopup('Yep, you play on the line intersections - not <i>in</i> the squares.', gotIt, info);
    firstDone = true;
    return checkComplete();
  }
  var needPrompt = count > 3;
  if (needPrompt && !sideDone && !sidePrompted) {
    showPopup(prefix + 'Try playing on the very edge.', okay, info);
    sidePrompted = true;
    return checkComplete();
  }
  if (needPrompt && !cornerDone && !cornerPrompted) {
    showPopup(prefix + 'Try playing in the very corner.', okay, info);
    cornerPrompted = true;
    return checkComplete();
  }
  count++;
  firstDone = true;
}
