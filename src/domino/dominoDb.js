const sq = require("../other/simpleQuestionDb");

class dominoDb extends Function {
  constructor(props) {
    super(props);
  }
  async getCollection() {
    const collection = await sq.getFullList();
    console.log("Full Collection");
    console.log(collection);
    return collection;
  }
  async getQuestions(anzahlFragen) {
    let collection = await this.getCollection();
    let res = [];
    //um ein Kreis zu bilden
    if(anzahlFragen<8){
      for (let i = 0; i < 8; i++) {
        let item = await this.getItem(collection.results[i].key);
        console.log("Eine Frage und Antwort:   "+item);
        res.push(item);
      }
    }else
      for (let i = 0; i < anzahlFragen; i++) {
        let item = await this.getItem(collection.results[i].key);
        console.log("Eine Frage und Antwort:   "+item);
        res.push(item);
      }

    console.log("Result: " + res);
    return res;
  }

  async getItem(key) {
    let item = await sq.getItem(key);
    return item;
  }

}

module.exports = new dominoDb();
