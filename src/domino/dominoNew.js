const db = require("../other/simpleQuestionDb")

class dominoNew extends Function {
  constructor(props) {
    super(props);
  }
  async getNewDomino(body) {
    const messenger = require("./dominoMessenger");
    let collection = await db.getFullList();
    let anzahlFragen = body.userCount * 4;
    let correctQuestions = [];
    let item;
    let laenge = 3;

    if (anzahlFragen < 8) {
      for (let i = 0; i < 8; i++) {
        item = await db.getItem(collection.results[i].key)
        correctQuestions.push(item)
        console.log(item);

      }
    } else
      for (let i = 0; i < anzahlFragen; i++) {
        item = await db.getItem(collection.results[i].key)
        correctQuestions.push(item)
        console.log(item);
      }
    let switchedList = this.switchList(correctQuestions)
    console.log(switchedList);

    await messenger.sendFirstMessage(
      switchedList,
      correctQuestions,
      body.users,
      body.room,
      laenge
    );
    return "Done Domino!";
  }

  switchList(correctQuestions) {
    let keys = []
    let questions = []
    let newQuestions = []
    let antworten = []
    for (let i = 0; i < correctQuestions.length; ++i) {
      questions.push(correctQuestions[i].props.question)
      console.log("Frage hinzugefügt: " + correctQuestions[i].props.question)
      antworten.push(correctQuestions[i].props.answer)
      console.log("Antwort hinzugefügt: " + correctQuestions[i].props.answer)
      keys.push(correctQuestions[i].key)
      console.log("Key hinzugefügt: " + correctQuestions[i].key)
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

    console.log(questions + "  unterschiede " + verschobenAntworten)
    for (let i = 0; i < questions.length; ++i) {
      newQuestions.push({ question: questions[i], answer: verschobenAntworten[i], key: keys[i] })
    }
    return newQuestions
  }
}
module.exports = new dominoNew();
