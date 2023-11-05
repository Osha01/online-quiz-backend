class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(switchedList, correctQuestions, users, room, laenge) {
    console.log("messageStart");
    const Ably = require("ably");
    const ably = new Ably.Realtime.Promise("0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE");
    let anzahlUsers = users.length
    let copyQ = switchedList;
    let specificQ = []
    let rindex;
    let item;

    await ably.connection.once("connected");
    let channelId = "room" + room;
    const channel = ably.channels.get(channelId);
    // Ein Spieler, 8 Fragen
    if (anzahlUsers == 1) {
      specificQ = copyQ;
      let body = {
        game: "domino",
        users: users,
        data: {
          correctQuestions: correctQuestions,
          laenge: laenge,
          activePlayer: users[0],
          questions: specificQ,
        },
      };
      await channel.publish("start" + users[0], body);
      console.log("gesendet an " + users[0]);
    } else {
      //Mehr Spieler jeder 4 Fragen
      for (let i = 0; i < anzahlUsers; i++) {
        for (let j = 0; j < 4; j++) {
          rindex = this.getRandomInt(copyQ.length);
          item = copyQ[rindex];
          specificQ.push(item)
          copyQ = this.deleteQuestion(rindex, copyQ)
          console.log("Spieler " + users[i] + " bekommt die Frage ")
          console.log("copyQ" + copyQ)
        }
        let body = {
          game: "domino",
          users: users,
          data: {
            correctQuestions: correctQuestions,
            laenge: laenge,
            activePlayer: users[0],
            questions: specificQ,
          },
        };
        await channel.publish("start" + users[i], body);
        console.log("gesendet an " + users[i]);
      }
    }


    ably.close();

  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  deleteQuestion(index, list) {
    let nList = []
    for (let i = 0; i < list.length; ++i) {
      if (i != index) {
        nList.push(list[i])
      }
    }
    return nList
  }
}
module.exports = new dominoMessenger();
