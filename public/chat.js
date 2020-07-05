// make connection

const socket = io.connect('http://localhost:3000');

// Dom Grab

const output = document.getElementById('output');
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const feedback = document.getElementById('feedback');

// emit chat event

btn.addEventListener('click', () => {
    console.log("Click");
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = ""
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

