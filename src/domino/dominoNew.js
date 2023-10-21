class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    const db = require("./dominoDb");
    let questions = await db.getRandomQuestions(body.users.length);
    let gameId = db.getNewId();
    await messenger.sendFirstMessage(questions, body.users, body.room, gameId);
    return "Done Domino!";
  }
}
module.exports = new domino();
