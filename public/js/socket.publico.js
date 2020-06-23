var socket = io();

socket.on("estadoActual", (resp) => {
  actualizaHTML(resp.ultimos4);
});

socket.on("ultimos4", (resp) => {
  var audio = new Audio("audio/new-ticket.mp3");
  audio.play();

  actualizaHTML(resp.ultimos4);
});

actualizaHTML = (ultimos4) => {
  for (let i = 0; i < ultimos4.length; i++) {
    $("#lblTicket" + (i + 1)).text("Ticket " + ultimos4[i].ticket);
    $("#lblEscritorio" + (i + 1)).text("Escritorio " + ultimos4[i].escritorio);
  }
};
