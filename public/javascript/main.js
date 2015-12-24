var socket = io();

// Create username submission
$('#userNameForm').submit(function(e){
    // Get username
    e.preventDefault();
    var username = $('#username').val();

    // Emit newusers
    socket.emit('new user', username, function(user){
        // if user was created
        if(user) {
            // Hide username form and display chat window
            $('#namesWrapper').hide();
            $('#mainWrapper').show();
        } 
        else {  // user already exist
            $('#nameError').html('Username is already taken');
        }
    });    
});

// Display users
socket.on('usernames', function(usernames){
    var list = '';
    for(i=0; i < usernames.length; i++) {
        list += usernames[i] + '<br>';
    }
    $('#users').html(list);
});


// Emit socket io event on new message
$('#messageForm').submit(function(){
    // the params passed into socket.emit are available
    // in socket.on on the sever side
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
});

// Display the new message that was broadcasted
socket.on('chat message', function(data) {
    $('#chatWindow').append('<strong>' + data.user + '</strong>: ' + data.msg + '<br>');

    // make it scroll to bottom automatically
    $('#chatWindow').scrollTop($('#chatWindow').get(0).scrollHeight);
});