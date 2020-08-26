var socket = io();

const allMessages = document.getElementById('allMessages');

socket.on('chat message', function(msg){
    const newMessage = document.createElement('li');

    newMessage.innerText = msg;
    allMessages.appendChild(newMessage);
});

function send() {
    const message = document.getElementById('message').value
    socket.emit('chat message', message);
}