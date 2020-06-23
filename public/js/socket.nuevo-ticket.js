//Comando para establecer la conexion

var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', function(){
    console.log('conecctado')
})

socket.on('disconnect', function(){
    console.log('desconectado')
})

socket.on('estadoActual', function(resp){
    console.log(resp)
    label.text(`Ultimo, ${resp.actual}`)
})

$('#nuevoTicket').on('click', function(){

    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket)
    })

})

$('#reiniciar').on('click', function(){

    socket.emit('reiniciarTickets', null, function(){
        label.text('No hay tickets emitidos')
    })

})