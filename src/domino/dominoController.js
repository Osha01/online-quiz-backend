class dominoController extends Function() {
  constructor(props) {
    super(props);
  }
  async parseCall(body) {
    if (body.state == -1) {
      const dominoNew = require("./dominoNew");
      let res = await dominoNew.getNewDomino(body);
      return res;
    }
  }
}
module.exports = new dominoController();
