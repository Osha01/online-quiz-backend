class WwmController extends Function {
    constructor(props) {
      super(props);
    }
    async parseCall(body) {
      console.log(body);
      if (body.type == 1) {
        const wwmNew = require("./WwmNew");
        let res = await wwmNew.getNewWwm(body);
        return res;
      } 
    }
}
module.exports = new WwmController();