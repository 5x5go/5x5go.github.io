setTitle('Capturing "False Eyes"');
setDesc('Once again, you can capture <i>all</i> the white stones by \'eating away\' at the \'false eyes\'.');

var prob =
  'OO!O!' +
  'O!OOO' +
  '!O!!!' +
  'O!OOO' +
  '!?!!!';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured && board[4][0].stone == black) {
    showPopup('Great job! You have the idea now.' + tapNext, okay, good);
    // setAction(next, '');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
