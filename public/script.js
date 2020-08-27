// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    if(message.value == "/quote") {
        async function hej() {

        const quoteList = await fetch("https://type.fit/api/quotes")
        const oneQoute = await quoteList.json()
    
        var item = oneQoute[Math.floor(Math.random() * oneQoute.length)]; 
        socket.emit('chat', {
            handle: handle.value,
            message: item.text
        });
    }
    hej();
    message.value = "";
    } else {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

