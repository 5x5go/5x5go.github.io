setTitle('Capturing "False Eyes"');
setDesc('Again, you can capture <i>all</i> the white stones if you start with the \'false eyes\'.');

var prob =
  'OO!O!' +
  'O!OOO' +
  '!O!!!' +
  '?!?..' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured && board[4][0].stone == black) {
    showPopup('Excellent! You getting the hang of this \'eating away\' idea.' + tapNext, okay, good);
    setAction(next, 'captureFalseEyes2');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
