const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

let ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", (n, callback) => {
    let siguiente = ticketControl.siguiente();
    callback(siguiente);
  });

  client.on("reiniciarTickets", (n, callback) => {
    ticketControl.reiniciarConteo();
    callback();
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on('atenderTicket', (data, cb) => {
    if (!data.escritorio){
      return {
        err: true,
        message: 'EL escritorio es requerido'
      }
    }
  
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    
    cb(atenderTicket)
    
    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4()
    })
    
  })
  
});
