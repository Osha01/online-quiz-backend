class dominoController extends Function() {
  constructor(props) {
    super(props);
  }
  async parseCall(body) {
    console.log("Domino____> " + body);
    return "Done!";
  }
}
module.exports = new dominoController();
