import db from("../other/simpleQuestionDb")

class domino extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    let collection = await db.getFullList();
    let anzahlFragen = body.userCount*4;
    let questionList =[];
    let item;

    if(anzahlFragen<8){
      for (let i = 0; i < 8; i++) {
        item = await db.getItem(collection[i].key)
        questionList.push(item)
        console.log(item);

      }
    }else
      for (let i = 0; i < anzahlFragen; i++) {
        item = await db.getItem(collection[i].key)
        questionList.push(item)
        console.log(item);
    }

    await messenger.sendFirstMessage(
      questionList,
      body.users,
      body.userCount,
      body.room
    );
    return "Done Domino!";
  }
}
module.exports = new domino();
