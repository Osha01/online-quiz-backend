const db = require("@cyclic.sh/dynamodb");

class dominoDb extends Function {
  constructor(props) {
    super(props);
  }
  async getCollection() {
    const collection = await db.collection("domino").list();
    console.log("Full Collection");
    console.log(collection);
    return collection;
  }
  async getRandomQuestions(anzahlFragen) {
    let collection = await this.getCollection();
    let res = [];
    let anzahl = anzahlFragen * 4;
    for (let i = 0; i < anzahl; i++) {
      let item = await this.getItem(collection.results[i].key);
      console.log(item);
      res.push(item);
    }
    console.log("Result: " + res);
    return res;
  }
  async getItem(key) {
    let item = await db.collection("domino").get(key);
    return item;
  }
  async getNewId() {
    const id = 0;
    const collection = await db.collection("domino").list();
    for (let i = 0; i < collection.length; ++i) {
      if (collection[i].id == id) {
        id++;
      }
    }
    return id;
  }
}

module.exports = new dominoDb();
