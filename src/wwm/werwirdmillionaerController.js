class TabooController extends Function {
    constructor(props) {
        super(props);
    }

    async parseCall(body) {
        const db = require('./tabooDb');
        const messenger = require('./tabooMessenger');

        let quiz = await db.getTabooQuiz(body.userCount);
        let usersScrambled = await this.scrambleUsers(body.users, body.userCount);

        await messenger.sendMessages(quiz, usersScrambled, body.room);
    }
}

module.exports = new TabooController();