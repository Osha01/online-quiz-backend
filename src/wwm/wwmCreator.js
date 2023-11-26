//Erstellt das Quiz für "Wer wird Millionär" 
class WwmCreator extends Function {
    constructor(props) {
        super(props);
    }
    // Erstellt das Quiz mit zufällig ausgewählten Fragen und Antwortoptionen
    async createQuiz() {
        const db = require('../other/simpleQuestionDb');
        let list = await db.getWwmList(); // Ruft die Liste der "Wer wird Millionär?"-Fragen ab
        console.log(list);
        let indexes = await this.getRandomIndexes(list.length - 1, 10);

        let questions = [];
        for (let i = 0; i < indexes.length; i++) {
            questions.push(await db.getItem(list[indexes[i]].key));
        }
        let quiz = [];

        for (let i = 0; i < indexes.length; i++) {
            let scramble = await this.getRandomIndexes(3, 4);
            console.log(scramble);
            let answers = [];
            let correct;
            console.log(questions[i]);
            for (let j = 0; j < scramble.length; j++) {
                switch (scramble[j]) {
                    case 0:
                        console.log(0);
                        answers.push(questions[i].props.answer);
                        console.log(answers);
                        correct = j;
                        break;
                    case 1:
                        console.log(1);
                        answers.push(questions[i].props.falseAnswer1);
                        break;
                    case 2:
                        console.log(2);
                        answers.push(questions[i].props.falseAnswer2);
                        break;
                    case 3:
                        console.log(3);
                        answers.push(questions[i].props.falseAnswer3);
                        break;
                }
            }
            quiz.push({
                question: questions[i].props.question,
                answers: answers,
                correct: correct
            })
        }
        console.log(quiz);
        return quiz;
    }
    // Generiert eine Liste mit zufälligen Indexen
    async getRandomIndexes(max, num) {
        const randomizer = require('../other/randomInt');

        let indexes = [];
        for (let i = 0; i < num && i <= max; i++) {
            let r = randomizer.getRandomInt(0, max);
            while (this.checkForIndex(r, indexes)) {
                console.log(r + ' bereits vorhanden, i: ' + i + ', max: ' + max + ', num: ' + num);
                console.log(indexes);
                r = (r + 1) % (max + 1);
            }
            indexes.push(r);
        }
        return indexes;
    }
    // Überprüft, ob ein Index bereits in der Liste vorhanden ist
    checkForIndex(index, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == index) return true;
        }
        return false;
    }
}

module.exports = new WwmCreator();