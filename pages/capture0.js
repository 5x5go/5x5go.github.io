setTitle('Capturing Stones');
setDesc("Stones don't move, but may be <i>captured</i>. Try capturing the white stone by surrounding it");
createBoard();
place(2, 2, white);

function tap(x, y) {
  if (promptIfNonEmpty(x, y)) return;
  place(x, y, black);
  if ((x == 2 && (y == 1 || y == 3)) || ((x == 1 || x == 3) && y == 2)) {
  }
}
