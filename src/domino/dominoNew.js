class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    const db = require("./dominoDb");
    let questions = await db.getQuestions(body.userCount*4);
    console.log( "Eingehender body: "+ 
      questions+
      body.users+
      body.userCount+
      body.room);

    await messenger.sendFirstMessage(
      questions,
      body.users,
      body.userCount,
      body.room
    );
    return "Done Domino!";
  }
}
module.exports = new domino();
