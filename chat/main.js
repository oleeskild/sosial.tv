<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>

var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('disconnected', function(){
  $('#messages').append($('<li>').text("A user disconnected"));
});
socket.on('new user', function(msg){
  $('.boxed').append($('<li>').text(msg));
});
