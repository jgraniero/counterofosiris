import socketio_client from 'socket.io-client';

function countWin(msg) {
  let winBubbles = document.getElementById('win-list').children;;
  addPlayedClass(winBubbles);
}

function countLoss(msg) {
  let lossBubbles = document.getElementById('loss-list').children;
  addPlayedClass(lossBubbles);
}

function addPlayedClass(bubbles) {
  for (let bubble of bubbles) {
    if (bubble.classList.contains('unplayed')) {
      bubble.classList.remove('unplayed');
      bubble.classList.add('played');
      return;
    }
  }
}

export default function() {
  let io = socketio_client();

  io.on('win message', countWin);  
  io.on('loss message', countLoss);
}
