var express = require('express');

exports.config = function(io) {
    // io.on('connection', function(socket) {
    //     console.log('a user connected');
    //     socket.on('disconnect', function() {
    //         console.log('disconnected a user was');
    //     })
    // });

    usernames = [];

    io.on('connection', function(socket){
        // new users
        // the params in function are passed in by socket.emit on client side
        socket.on('new user', function(user, cb){
            // if user already exist
            if (usernames.indexOf(user) != -1) {
                cb(false)
            }
            else {  // create new user
                cb(true);
                socket.username = user;
                usernames.push(socket.username);
                updateUserNames();
            }
            
        });

        // update usernames
        function updateUserNames() {
            io.emit('usernames', usernames);
        }

        // disconnected users
        socket.on('disconnect', function(data){
            if(!socket.username) return;
            usernames.splice(usernames.indexOf(socket.username), 1);
            updateUserNames();
        });

        // sending message
        socket.on('chat message', function(msg){
            io.emit('chat message', {msg: msg, user: socket.username});
        });
    });
}