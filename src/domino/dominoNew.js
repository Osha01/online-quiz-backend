const db = require("../other/simpleQuestionDb")

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
    let laenge = 3;

    if(anzahlFragen<8){
      for (let i = 0; i < 8; i++) {
        item = await db.getItem(collection.results[i].key)
        questionList.push(item)
        console.log(item);

      }
    }else
      for (let i = 0; i < anzahlFragen; i++) {
        item = await db.getItem(collection.results[i].key)
        questionList.push(item)
        console.log(item);
    }
    let switchtedList = this.switchList(questionList)
    console.log(switchtedList);

    await messenger.sendFirstMessage(
      questionList,
      body.users,
      body.room,
      laenge
    );
    return "Done Domino!";
  }
  switchList(questionList){
      let fragen=[]
      let antworten = []
      for(let i= 0;i<questionList.length;++i){
        fragen.push(questionList[i].props.question)
        console.log("Frage hinzugefügt: "+questionList.props.question)
        fragen.push(questionList[i].props.answer)
        console.log("Frage hinzugefügt: "+questionList.props.answer)
      }
  }
}
module.exports = new domino();
