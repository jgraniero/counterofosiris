import socketio_client from 'socket.io-client';

function countWin() {
  let winBubbles = document.getElementById('win-list').children;;
  addPlayedClass(winBubbles);
}

function countLoss() {
  let lossBubbles = document.getElementById('loss-list').children;
  addPlayedClass(lossBubbles);
}

function useMercy() {
  let mercyContainer = document.getElementById('mercy-container');
  replaceClass(mercyContainer, 'unused', 'used');
}

function reset() {
  let lossBubbles = document.getElementById('loss-list').children;
  let winBubbles = document.getElementById('win-list');
  let mercyContainer = document.getElementById('mercy-container');

  addUnplayedClassToAll(lossBubbles);
  addUnplayedClassToAll(winBubbles);
  replaceClass(mercyContainer, 'used', 'unused');
}

function addPlayedClass(bubbles) {
  for (let bubble of bubbles) {
    if (replaceClass(bubble, 'unplayed', 'played')) {
      return;
    }
  }
}

function addUnplayedClassToAll(bubbles) {
  for (let bubble of bubbles) {
    replaceClass(bubble, 'played', 'unplayed');
  }
}

function replaceClass(element, toReplace, replacement) {
  if (element.classList.contains(toReplace)) {
    element.classList.remove(toReplace);
    element.classList.add(replacement);
    return true;
  }

  return false;
}

export default function() {
  let io = socketio_client();

  io.on('win message', countWin);  
  io.on('loss message', countLoss);
  io.on('mercy message', useMercy);
  io.on('reset message', reset);
}
