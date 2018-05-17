
// TODO: get the current ip
var ip = 'http://localhost:12598';
var socket = io.connect(ip);

/* Events Manager */
// On connecting, display a waiting message
socket.on('connecting', function(){
    $('#conversation').append('<p>Tentative de connexion &agrave; :' + ip + '...<p>');
});

// On connect, ask NickName and send it to server
socket.on('connect', function(){
    socket.emit('add_user', prompt("Quel est votre pseudo ?"));
});

// On connect_failed, display a error message
socket.on('connect_failed', function(){
    $('#conversation').append('<p>Tentative de connexion echou&eacute; !<p>');
});

// On disconnect, display a log-off message
socket.on('disconnect', function(){
    $('#conversation').append('<p>D&eacute;connect&eacute; du serveur !<p>');
});

// On reconnecting, display a waiting message
socket.on('reconnecting', function(){
    $('#conversation').append('<p>Tentative de reconnexion &agrave; :' + ip + '...<p>');
});

// On reconnect, display a success
socket.on('reconnect', function(){
    $('#conversation').append('<p>Tentative de reconnexion reussit !<p>');
});

// On reconnect_failed, display a error message
socket.on('reconnect_failed', function(){
    $('#conversation').append('<p>Tentative de reconnexion &eacute;chou&eacute; !<p>');
});

// On error, display a error message
socket.on('error', function(){
    $('#conversation').append('<p>Une erreur est survenue inopin&eacute;ment !<p>');
});

// On message, display message
socket.on('message', function(data) {

    if(typeof data == 'object')
        $('#conversation').prepend('<p><b>'+ data.username + ':</b> ' + data.content + '<p>');
    else
        $('#conversation').prepend( data + '<br>');

});

// on update_users, clean users list, and recreate it with right values
socket.on('update_users', function(clients) {

    $('#users').empty();
    $.each(clients, function(key, value) {
        $('#users').append('<li class="client">' + value + '</li>');
    });

});

// On document ready
$( document ).ready(function() {

    //Set focus to text field
    $('#data').focus();

    // When "Send" is clicked, get text field value, add into conversation and send it to server.
    $('#datasend').click(function () {

        var messUser = $('#data').val();
        if( messUser )
        {
            socket.emit('message', messUser );
            $('#conversation').prepend( "<p><b>Vous : </b>"+ messUser + "</p>" );
            $('#data').val("");
        }
    });

    // Or when enter key is pressed (simulate click on "Send")
    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
            $('#data').focus();
        }
    });

});