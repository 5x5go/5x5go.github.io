setTitle('Capturing Stones');
setDesc("Stones don't move, but may be <i>captured</i>. Try capturing the white stone by surrounding it");
createBoard();
place(2, 2, white);

var surrounding = 0;
function tap(x, y) {
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  switch (xyLetter(x, y)) {
    case 'H':
    case 'L':
    case 'N':
    case 'R':
      switch (++surrounding) {
        case 1:
          showPopup('Nice! This fills one of white\'s "Liberties" along the lines. Keep going...', 'Okay!', good);
          break;
        case 3:
          mark(2, 2, frown);
          showPopup('Almost! White is sad with a single liberty. You might say "Atari!" - like "Check" in Chess', 'Okay!', good);
          break;
        case 4:
          capture(2, 2);
          setTimeout(function () {
            showPopup('Great job! Tap "Next" below to continue', 'Okay!', good);
            setAction('Next', 'capture1');
          }, 1000);
          break;
      }
  }
  if ((x == 2 && (y == 1 || y == 3)) || ((x == 1 || x == 3) && y == 2)) {
  }
}
