var socket = io();

$('form').submit(function(){
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#chatWindow').append($('<p>').text(msg));
});