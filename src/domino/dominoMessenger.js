class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(questions, users, userCount, room, gameId) {
    const db = require("./dominoDb");
    console.log("messageStart");
    const Ably = require("ably");
    const ably = new Ably.Realtime.Promise(
      "0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE"
    );
    await ably.connection.once("connected");
    let channelId = "room" + room;
    const channel = ably.channels.get(channelId);
    let body = {
      game: "domino",
      data: {
        fragen: questions,
      },
    };
    console.log("user0 " + users[0]);
    for (let i = 0; i < userCount; i++) {
      console.log(body);
      await channel.publish("start" + users[i], body);
      console.log("gesendet an " + users[i]);
    }
    ably.close();
  }
}
module.exports = new dominoMessenger();
