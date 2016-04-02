setTitle('Capturing "False Eyes"');
setDesc('You can capture <i>all</i> the white stones if you start with the \'false eye\'.');

var prob =
  'OO!O!' +
  'O!OOO' +
  '!?!!!' +
  '.....' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured && board[4][0].stone == black) {
    showPopup('Wow! You had to \'eat away\' at the white groups.' + tapNext, okay, good);
    setAction(next, 'captureFalseEyes1');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
