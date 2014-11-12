var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
    //May need to change this so theere are only colors you can see well
    socket.color = data.color = "#" + Math.random().toString(16).slice(2,8);
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

http.listen(4000, function(){
  console.log('listening on *:3000');
});
