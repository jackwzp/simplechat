var express = require('express');

exports.config = function(io) {
    // io.on('connection', function(socket) {
    //     console.log('a user connected');
    //     socket.on('disconnect', function() {
    //         console.log('disconnected a user was');
    //     })
    // });

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
    });
}