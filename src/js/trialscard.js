import socketio_client from 'socket.io-client';

function countWin(msg) {
  let winBubbles = document.getElementById('win-list').children;;
  for (let winBubble of winBubbles) {
    if (winBubble.classList.contains('unplayed')) {
      winBubble.classList.remove('unplayed');
      winBubble.classList.add('played');
      return;
    }
  }
}

export default function() {
  let io = socketio_client();
  io.on('win message', countWin);  
}
