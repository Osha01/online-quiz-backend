class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    const db = require("./dominoDb");

    let questions = await db.getRandomQuestions(body.userCount);
    let gameId = db.getNewId();
    console.log("GameId" + gameId);
    await messenger.sendFirstMessage(
      questions,
      body.users,
      body.userCount,
      body.room,
      gameId
    );
    return "Done Domino!";
  }
}
module.exports = new domino();
