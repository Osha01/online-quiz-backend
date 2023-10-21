class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    const db = require("./dominoDb");
    const anzahlSpieler = body.users.length;
    let questions = await db.getRandomQuestions(body.users.length);
    console.log("Questions: " + questions);
    let gameId = db.getNewId();
    console.log("GameId" + gameId);
    await messenger.sendFirstMessage(questions, body.users, body.room, gameId);
    return "Done Domino!";
  }
}
module.exports = new domino();
