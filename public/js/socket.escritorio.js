var socket = io();

//Hay que obtener los parametros de la url

var searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', () => {

    socket.emit('atenderTicket', {escritorio:escritorio}, (resp) => {
        if( resp.ticket){ 
            label.text('Ticket' + resp.ticket)
        }else{
            $('h4').text(resp)
        }
    })

})