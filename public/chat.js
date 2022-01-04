const socket = io.connect('http://localhost:3000');


const message = document.getElementById('message')
const btn = document.getElementById('send')
const output = document.getElementById('output')
const username = document.getElementById('username')
const feedback = document.getElementById('feedback')

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        username: username.innerHTML,
    })
    message.value ="";
})
message.addEventListener('keypress', function(){
    
    socket.emit('typing', username.innerHTML);
})

socket.on('chat',function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>'+data.username+':</strong>'+data.message+'</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});