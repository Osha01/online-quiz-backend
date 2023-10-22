class TabooController extends Function {
    constructor(props) {
        super(props);
    }

    async parseCall(body) {
        const creator = require('./wwmCreator');
        const messenger = require('./wwmMessenger');
        let quiz = await creator.createQuiz();
        await messenger.sendMessages(quiz, body.moderator, body.player, body.room);
    }
}

module.exports = new TabooController();