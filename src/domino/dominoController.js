class dominoController extends Function() {
  constructor(props) {
    super(props);
  }
  async parseCall(body) {
    if (body.state == -1) {
      const dominoNew = require("./dominoNew");
      let res = await dominoNew.getNewDomino(body);
      return res;
    } else if (body.state == 4) {
      const dominoCorrector = require("./dominoCorrector");
      let res = await dominoCorrector.setDataErgebnisFormular(body);
      return res;
    }
  }
}
module.exports = new dominoController();
