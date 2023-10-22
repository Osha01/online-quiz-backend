class WwmNew extends Function {
    constructor(props) {
        super(props)
    }
    async getNewWwm(body) {
        const messenger = require("./WwmMessenger"); 
        let quiz = await this.getRandomQuiz(body.userCount);
        await messenger.messageStart(
            quiz, 
            body.users, 
            body.room);
        return 'Quiz Done!';
    }
    async getRandomQuiz(userCount) {
        const db = require('./wwmDb')
        let allQuizes = await db.getFilteredList(userCount);
        let index = this.getRandomInt(0, allQuizes.length - 1);
        let key = allQuizes[index].key;
        return await db.getItem(key);
    }
}
module.exports = new wWwmNew;