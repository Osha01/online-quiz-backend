//Steuert den Ablauf des "Wer wird Millionär?"-Spiels
class WwmController extends Function {
    constructor(props) {
        super(props);
    }
    // Verarbeitet den Aufruf und initiiert die Erstellung und den Versand des Quiz
    async parseCall(body) {
        const creator = require('./wwmCreator');
        const messenger = require('./wwmMessenger');
        console.log('start parsing call...');
        console.log('creating quiz...');
        let quiz = await creator.createQuiz();
        console.log('done creating quiz!');
        console.log('start sending messages...');
        await messenger.sendMessages(quiz, body.moderator, body.player, body.room, body.users);
        console.log('done sending messages!');
        console.log('done parsing call!');
    }
}

module.exports = new WwmController();