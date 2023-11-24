class wwmController extends Function {
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

        // Prüfen, ob der 50/50-Joker verwendet wird
        if (body.type === 2) {
            quiz = this.useFiftyFiftyJoker(quiz);
        }

        console.log('start sending messages...');
        await messenger.sendMessages(quiz, body.moderator, body.player, body.room, body.users);
        console.log('done sending messages!');
        console.log('done parsing call!');
    }

    // Funktion, um den 50/50-Joker zu verwenden
    useFiftyFiftyJoker(quiz) {
        // Überprüfe, ob das Quiz genügend Fragen und Antworten enthält
        if (quiz.length < 1 || quiz[0].answers.length < 4) {
            // Nicht genügend Fragen oder Antworten für den Joker
            return quiz;
        }

        // Zufällig zwei falsche Antworten auswählen und entfernen
        const correctIndex = quiz[0].correct;
        const allAnswers = [...quiz[0].answers];
        allAnswers.splice(correctIndex, 1); // Entferne die richtige Antwort

        // Zufällig zwei falsche Antworten entfernen
        const removedIndexes = this.getRandomIndexes(allAnswers.length - 1, 2);
        removedIndexes.forEach(index => {
            allAnswers.splice(index, 1);
        });

        // Aktualisiere das Quiz mit den verbleibenden Antworten
        quiz[0].answers = allAnswers;

        return quiz;
    }
}

module.exports = new wwmController();