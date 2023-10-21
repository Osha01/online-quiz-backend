class dominoMessenger extends Function {
  constructor(porps) {
    super(props);
  }

  async sendFirstMessage(fragen, users, room) {
    db.require("./dominoDb");
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
        id: this.db.getNewId(),
        frage: "Hallo Frage1",
      },
    };
    for (let i = 0; i < users.length; i++) {
      await channel.publish("start" + users[i], body);
    }
    ably.close();
  }
}
module.exports = new dominoMessenger();
