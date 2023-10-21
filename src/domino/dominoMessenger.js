class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(questions, users, room, gameId) {
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
        id: gameId,
        fragen: questions,
      },
    };
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      await channel.publish("start" + users[i], body);
      console.log("An " + users[i] + " " + body.data.id);
    }
    ably.close();
  }
}
module.exports = new dominoMessenger();
