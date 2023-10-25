class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    const db = require("./dominoDb");
    console.log( "Eingehender body: "+ 
      questions+
      body.users+
      body.userCount+
      body.room);

    let questions = await db.getQuestions(body.userCount*4);

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
