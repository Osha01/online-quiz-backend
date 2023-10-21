class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(questions, users, room) {
    const db = require("./dominoDb");
    console.log("messageStart");
    const Ably = require("ably");
    const ably = new Ably.Realtime.Promise(
      "0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE"
    );
    await ably.connection.once("connected");
    let channelId = "room" + room;
    let id = db.getNewId();
    const channel = ably.channels.get(channelId);
    let body = {
      game: "domino",
      data: {
        id: id,
        frage: questions,
      },
    };
    for (let i = 0; i < users.length; i++) {
      await channel.publish("start" + users[i], body);
    }
    ably.close();
  }
}
module.exports = new dominoMessenger();
