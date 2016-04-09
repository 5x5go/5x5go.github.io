var pause = 500;
var logging = false; // TODO: for debugging only

var board = [];

function edge(x, y) {
  return 'QWWWEASSSDASHSDASSSDZXXXC'[x + y * 5];
}

function getPoint(x, y) {
  if (x < 0 || x > 4 || y < 0 || y > 4) return { off: true, stone: 'empty' };
  return board[x][y];
}

function imgsrc(point) {
  // shadows
  var top = getPoint(point.x, point.y - 1).stone != 'empty';
  var left = getPoint(point.x - 1, point.y).stone != 'empty';
  var shadow = top ? left ? 'B' : 'T' : left ? 'L' : 'N';
  var mark = '';
  switch (point.mark) {
    case 'smile': mark = 'S'; break;
    case 'frown': mark = 'F'; break;
  }
  switch (point.stone) {
    case 'empty': return 'img/D' + mark + edge(point.x, point.y) + shadow + '.gif';
    case 'white': return 'img/W' + mark + shadow + '.gif';
    case 'black': return 'img/B' + mark + shadow + '.gif';
  }
}

function render(x, y) {
  var p = getPoint(x, y);
  if (!p.off)
    document.getElementById(p.id).src = imgsrc(p);
}

var done = false;

function tapEvent(x, y) {
  if (done) return;
  if (promptIfNonEmpty(x, y)) { return; }
  place(x, y, toMove);
  var captured = isCapture(x, y);
  if (isSuicide(x, y)) return;
  markAtari(x, y);
  tap(x, y, captured);
}

function createBoard() {
  board = [];
  var htm = '';
  for (var i = 0; i < 5; i++) board[i] = [];
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      var p = {
        id: 'p' + x + y * 5,
        x: x, y: y,
        stone: 'empty'
      };
      board[x][y] = p;
      htm += '<img id="' + p.id + '" src="' + imgsrc(p) + '" onclick="tapEvent(' + x + ',' + y + ')" width="60" height="60" />';
    }
    htm += '<br/>';
  }
  document.getElementById('board').innerHTML = htm;
}

var black = 'black';
var white = 'white';
function place(x, y, color) {
  board[x][y].stone = color;
  render(x, y);
  render(x + 1, y);
  render(x, y + 1);
}

function capture(x, y) {
  place(x, y, 'empty');
  mark(x, y, '');
}

var smile = 'smile';
var frown = 'frown';
var nomark = '';

function mark(x, y, m) {
  board[x][y].mark = m;
  render(x, y);
}

function opposite(color) { return color == black ? white : black; }

function xyLetter(x, y) { return "ABCDEFGHIJKLMNOPQRSTUVWXY"[x + y * 5]; }

function setContent(id, content) {
  var elem = document.getElementById(id);
  elem.style.display = content == '' ? 'none' : '';
  elem.innerHTML = content;
  return elem;
}

function setTitle(title)
{
  setContent('title', title);
  document.title = '5x5 Go - ' + title;
}

function nav(page) {
  // document.getElementById('permlink').href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '#' + page;
  // var href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '#' + page + '?nocache=' + Math.random();
  // window.location.href = href;
  loadPage(page);
}

function setAction(content, page) {
  setContent('action', content).href = 'javascript:nav("' + page + '")';
}

function showHeader() { document.getElementById('header').style.display = ''; }

function setSub(sub) { setContent('subtitle', sub); }

function setDesc(desc) { setContent('description', desc); }

function showPopup(content, confirm, color) {
  document.getElementById('popup_text').innerHTML = content;
  document.getElementById('popup_bg').style.backgroundColor = color;
  document.getElementById('popup_button').innerHTML = confirm;
  document.getElementById('popup').style.display = '';
}

var bad = 'red';
var good = 'green';
var info = 'goldenrod';

function hidePopup(content, confirm) {
  document.getElementById('popup').style.display = 'none';
}

function clear() { 
  done = false;
  setTitle('');
  setSub('');
  setDesc('');
  setAction('','');
  hidePopup();
}

function loadPage(name) {
  // var i = name.indexOf('?');
  // name = name.substr(0, i);
  if (name.length == 0) name = 'captureSingle0'; // first problem
  clear();
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = 'pages/' + name + '.js?nocache=' + Math.random();
  // s.innerHTML = null;
  document.getElementById("pagescript").innerHTML = "";
  document.getElementById("pagescript").appendChild(s);
  // document.getElementById("pagescript").src = 'pages/' + name + '.js?nocache=' + Math.random();
  // document.cookie = name;
}

function load() {
  var hash = location.hash;
  if (hash.length > 1) loadPage(hash.substr(1));
  // else loadPage(document.cookie);
  else loadPage('');
}

function promptIfNonEmpty(x, y) {
  var nonEmpty = getPoint(x, y).stone != 'empty';
  if (nonEmpty)
    showPopup('You can only play in <i>empty</i> spaces', 'Got it!', bad);
  return nonEmpty;
}

function promptUnnecessaryAndFarAway(x, y, prob) {
  switch (boardSample(x, y, prob)) {
    case '?':
      showPopup(unnecessary, gotIt, info);
      break;
    case '.':
      showPopup(farAway, gotIt, bad);
      break;
  }
}

function boardSample(x, y, board) { return board[x + y * 5]; }

function iterPoints(board, callback) {
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      callback(x, y);
    }
  }
}

function eachPoint(board, char, callback) {
  iterPoints(board, function (x, y) { if (boardSample(x, y, board) == char) callback(x, y); });
}

function countEachPoint(board, char) {
  var count = 0;
  eachPoint(board, char, function(x, y) { count++; });
  return count;
}

function iterAdjacent(x, y, callback) {
  if (x > 0) callback(x - 1, y);
  if (x < 4) callback(x + 1, y);
  if (y > 0) callback(x, y - 1);
  if (y < 4) callback(x, y + 1);
}

function iterGroup(x, y, callback) {
  iterPoints(board, function (x, y) { board[x][y].visited = false; });
  var color = board[x][y].stone;
  var group = [{ x: x, y: y }];
  var liberties = 0;
  while (group.length > 0) {
    var p = group.pop();
    var s = board[p.x][p.y].stone ;
    if (s == color) {
      callback(p.x, p.y);
      iterAdjacent(p.x, p.y, function (x, y) {
        if (!board[x][y].visited) group.push({x: x, y: y});
      });
    } else if (s == 'empty') {
      if (!board[p.x][p.y].visited) liberties++;
    }
    board[p.x][p.y].visited = true;
  }
  return liberties;
}

function liberties(x, y) {
  return iterGroup(x, y, function(x, y) {});
}

function markAtari(x, y) {
  var color = board[x][y].stone;
  iterAdjacent(x, y, function(x, y) {
    var s = board[x][y].stone;
    if (s != 'empty' && s != color) {
      if (liberties(x, y) == 1) {
        iterGroup(x, y, function(x, y) { mark(x, y, frown); });
      }
    }
  });
}

function isCapture(x, y) {
  var cap = false;
  var color = board[x][y].stone;
  iterAdjacent(x, y, function(x, y) {
    var s = board[x][y].stone;
    if (s != 'empty' && s != color) {
      if (liberties(x, y) == 0) {
        iterGroup(x, y, capture);
        cap = true;
      }
    }
  });
  return cap;
}

function isSuicide(x, y) {
  if (liberties(x, y) == 0) {
    iterGroup(x, y, function(x, y) { mark(x, y, frown); });
    showPopup(thisIsSuicide, ahISee, bad);
    setTimeout(function () { iterGroup(x, y, capture); }, pause * 3);
    return true;
  }
  return false;
}

var toMove;
function boardSetup(board, move) {
  createBoard();
  toMove = move;
  eachPoint(board, '#', function (x, y) { place(x, y, black); });
  eachPoint(board, 'O', function (x, y) { place(x, y, white); });
}

var farAway = 'Points this far away are unnecessary to capture.';
var unnecessary = 'This point is okay but unnecessary. Breating spaces are only along the lines.';
var thisIsSuicide = 'You just committed suicide! You have zero breating spaces.';
var tapNext = ' Tap "Next" to continue.';
var gotIt = 'Got it!';
var ahISee = 'Ah, I see!';
var okay = 'Okay!';
var next = 'next';
