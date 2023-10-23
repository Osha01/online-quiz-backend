class TabooController extends Function {
    constructor(props) {
        super(props);
    }

    async parseCall(body) {
        const creator = require('./wwmCreator');
        const messenger = require('./wwmMessenger');
        console.log('start parsing call...');
        console.log('creating quiz...');
        let quiz = await creator.createQuiz();
        console.log('done creating quiz!');
        console.log('start sending messages...');
        await messenger.sendMessages(quiz, body.moderator, body.player, body.room);
        console.log('done sending messages!');
        console.log('done parsing call!');
    }
}

module.exports = new TabooController();