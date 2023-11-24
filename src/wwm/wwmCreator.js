class wwmCreator extends Function {
    constructor(props) {
        super(props);
    }

    async createQuiz() {
        const db = require('../other/simpleQuestionDb');
        let list = await db.getWwmList();
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

    async applyFiftyFiftyJoker(question) {
        // Implementiere den 50/50-Joker für eine einzelne Frage

        let correctAnswer = question.correct;
        let availableAnswers = [...question.answers];
        availableAnswers.splice(correctAnswer, 1); // Entferne die korrekte Antwort

        // Zufällig eine falsche Antwort entfernen
        let removedIndex = Math.floor(Math.random() * availableAnswers.length);
        availableAnswers.splice(removedIndex, 1);

        return {
            ...question,
            answers: availableAnswers,
        };
    }

    async createQuiz() {
        const db = require('../other/simpleQuestionDb');
        let list = await db.getWwmList();
        console.log(list);
        let indexes = await this.getRandomIndexes(list.length - 1, 10);

        let questions = [];
        for (let i = 0; i < indexes.length; i++) {
            let question = await db.getItem(list[indexes[i]].key);
            // Anwendung des 50/50-Jokers auf jede Frage
            let questionWithJoker = await this.applyFiftyFiftyJoker(question);
            questions.push(questionWithJoker);
        }

        let quiz = questions.map(question => ({
            question: question.props.question,
            answers: question.answers,
            correct: question.correct,
        }));

        console.log(quiz);
        return quiz;
    }
    
    checkForIndex(index, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == index) return true;
        }
        return false;
    }
}

module.exports = new wwmCreator();