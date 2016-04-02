setTitle('Filling "Big Eyes" Last');
setDesc('You can place one stone, but not two inside the "eye" unless you\'re capturing');

var prob =
  '.!O!?' +
  '.!OO!' +
  '.?!OO' +
  '..?!!' +
  '.....';

boardSetup(prob, black);

function tap(x, y, captured) {
  if (captured) {
    showPopup('Great! As long as white doesn\'t \'fight back\', you can capture this too.' + tapNext, okay, good);
    setAction(next, 'captureBigEye2');
    done = true;
  }
  promptUnnecessaryAndFarAway(x, y, prob);
}
