const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {pingTimeout: 30000});
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('message' + msg);
    io.emit('chat message', msg);
  })

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});