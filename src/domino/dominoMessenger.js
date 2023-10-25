class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(questions, users, room, laenge) {
    console.log("messageStart");
    const Ably = require("ably");
    const ably = new Ably.Realtime.Promise("0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE");
    let anzahlFragen = questions.length;
    let anzahlUsers = users.length
    let copyQ = questions;
    let specificQ = []
    let rindex;
    let item;

    await ably.connection.once("connected");
    let channelId = "room" + room;
    const channel = ably.channels.get(channelId);


    for (let i = 0; i < anzahlUsers; i++) {
      // Spieler * 4 = Anzahlefragen 
      for (let j = 0; j < 4; j++) {
          rindex = this.getRandomInt(copyQ.length);
          item = copyQ[rindex];
          specificQ.push(item)
          copyQ = this.deleteQuestion(rindex, copyQ)
          console.log("Spieler "+users[i]+" bekommt die Frage "+item.key)
          console.log("copyQ"+copyQ)
      }
      let body = {
        game: "domino",
        users: users,
        data: {
          laenge: laenge,
          activePlayer: users[0],
          fragen: specificQ,
        },
      };
      await channel.publish("start" + users[i], body);
      console.log("gesendet an " + users[i]);

    }
    ably.close();
  }


  async sendResultsFormular(correctAnswers, wrongAnswers, users, room) {
    console.log("Ende Spiel");
    const Ably = require('ably');
    const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
    await ably.connection.once('connected');
    const channelId = 'domino' + this.state.room;
    const channel = ably.channels.get(channelId);

    console.log("ROOM "+this.state.room)
    this.setState({
      room: this.state.room,
      user: this.state.user,
      data: this.state.data,
      activePlayer: activePlayer,
      pool: pool,
      feld: feld,
      feldState: this.state.feldState,
    });   
    console.log("SEND: "+ feld+ pool+activePlayer)
    let body = {
      game: "domino",
      users: users,
      data: {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers
      },
    }

    await channel.publish('resultDomino', body);
    
    console.log("gesendet an " + body);
    ably.close();  
   
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  deleteQuestion(index, list){
    let nList =[]
    for(let i= 0; i<list.length;++i){
      if(i!=index){
        nList.push(list[i])
      }
    }
    return nList
  }
}
module.exports = new dominoMessenger();
