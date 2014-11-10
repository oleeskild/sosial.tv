var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var colors = ['#AE331F', '#D68434', '#116A9F', '#360B95', '#5F209E'];
var connections = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){



  socket.on('chat message', function(data){
    data.color = socket.color;
    socket.name = data.name;
    io.emit('chat message', data);
  });


  socket.on('user-ready', function(data){
    socket.name = data.name;
    socket.color = data.color = colors[Math.floor(Math.random() * colors.length)];
    io.emit('user-ready', data);
  });


  socket.on('disconnect', function(){
    delete connections[socket.id]; dispatchStatus();
    io.emit('disconnected', {name: socket.name, color: socket.color});
  });

  function dispatchStatus(){
    io.emit('status', connections);
  }

  connections[socket.id] = {}; dispatchStatus();

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
