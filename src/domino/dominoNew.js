const db = require("../other/simpleQuestionDb")

class dominoNew extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    let collection = await db.getFullList();
    let anzahlFragen = body.userCount * 4;
    let questionList = [];
    let item;
    let laenge = 3;

    if (anzahlFragen < 8) {
      for (let i = 0; i < 8; i++) {
        item = await db.getItem(collection.results[i].key)
        questionList.push(item)
        console.log(item);

      }
    } else
      for (let i = 0; i < anzahlFragen; i++) {
        item = await db.getItem(collection.results[i].key)
        questionList.push(item)
        console.log(item);
      }
    let switchtedList = this.switchList(questionList)
    console.log(switchtedList);

    await messenger.sendFirstMessage(
      switchtedList,
      body.users,
      body.room,
      laenge
    );
    return "Done Domino!";
  }
  switchList(questionList) {
    let keys = []
    let fragen = []
    let newQuestions = []
    let antworten = []
    for (let i = 0; i < questionList.length; ++i) {
      fragen.push(questionList[i].props.question)
      console.log("Frage hinzugefügt: " + questionList[i].props.question)
      antworten.push(questionList[i].props.answer)
      console.log("Antwort hinzugefügt: " + questionList[i].props.answer)
      keys.push(questionList[i].key)
      console.log("Key hinzugefügt: " + questionList[i].key)
    }


    let verschobenAntworten = []
    let laengeA = antworten.length

    for (let i = 0; i < laengeA; ++i) {
      if (i == 0) {

      } else {
        verschobenAntworten[i] = antworten[i - 1];
      }
    }
    verschobenAntworten[0] = antworten[(antworten.length - 1)];

    console.log(fragen + "  unterschiede " + verschobenAntworten)
    for (let i = 0; i < fragen.length; ++i) {
      newQuestions.push({ question: fragen[i], answer: verschobenAntworten[i], key: keys[i] })
    }
    return newQuestions
  }
}
module.exports = new dominoNew();
