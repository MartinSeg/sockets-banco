const fs = require("fs");

class Ticket {
  constructor(ticket, escritorio) {
    this.ticket = ticket;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = []

    let data = require("../data/data.json");

    if (this.hoy === data.hoy) {

      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;

    } else {

      this.reiniciarConteo();
    }
  }

  siguiente = () => {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null)
    console.log('Ticket' + this.ultimo)
    this.tickets.push(ticket)
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket = () => {
    return `Ticket ${this.ultimo}`;
  }

  getUltimos4 = () => {
    return this.ultimos4
  }

  atenderTicket = (escritorio) => {
    if(this.tickets.length === 0) {
      return 'No hay tickets en cola'
    }

    let numeroTicket = this.tickets[0].ticket;
    this.tickets.shift(); //Borra el Primer elemento de un Array

    let atenderTicket = new Ticket(numeroTicket, escritorio)
    
    this.ultimos4.unshift(atenderTicket) //Mete un elemento al inicio de un Array

    if(this.ultimos4.length > 4){
      this.ultimos4.splice(-1,1) // Borra el ultimo elemento
    }
    
    this.grabarArchivo();

    return atenderTicket 
  }

  reiniciarConteo = () => {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = []

    console.log('Sistema inicializado')
    this.grabarArchivo();
  }

  grabarArchivo = () => {

    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = { TicketControl };
