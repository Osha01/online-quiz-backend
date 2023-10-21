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
    for (let i = 0; i < anzahlFragen; i++) {
      res.push(collection[i]);
    }
    return res;
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
