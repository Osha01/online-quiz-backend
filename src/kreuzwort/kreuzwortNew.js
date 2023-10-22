class KreuzwortNew extends Function {
    constructor(props) {
        super(props)
    }

    async createNewKreuzwort(body) {
        const messenger = require("./kreuzwortMessenger")
        let quiz = await this.getRandomQuiz(body.userCount);
        await messenger.messageStart(quiz, body.users, body.room);
        return 'Done!';
    }

    async getRandomQuiz(userCount) {
        const db = require('./kreuzwortDb');
        const randomizer = require('../other/randomInt');

        let allQuizes = await db.getFilteredList(userCount);
        let index = randomizer.getRandomInt(0, allQuizes.length - 1);
        let key = allQuizes[index].key;
        return await db.getItem(key);
    }
}

module.exports = new KreuzwortNew;