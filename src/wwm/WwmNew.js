class WwmNew extends Function {
    constructor(props) {
        super(props)
    }
    async getNewWwm(body) {
        const messenger = require("./WwmMessenger"); 
        const db = require("./wwmDb");
        let quiz = await this.getRandomQuiz(body.userCount);
        await messenger.messageStart(
            quiz, 
            body.users,  
            body.room);
        return 'Quiz Done!';
    }
    
}
module.exports = new wWwmNew;