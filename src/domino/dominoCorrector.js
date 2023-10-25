class dominoCorrector extends Function() {
    constructor(props) {
      super(props);
    }
    getErgebnisFormular(body){
        let feld = JSON.parse(body).feld
        console.log(feld)
        console.log("get an answer FROM ME")
        return "Hallo";
    }

  }
  module.exports = new dominoCorrector();
  