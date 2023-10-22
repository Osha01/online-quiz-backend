class TabooCreator extends Function {
    constructor(props) {
        super(props);
    }

    createQuiz() {
        const db = require('../other/simpleQuestionDb');
        let list = db.getWwmList();
        let indexes = this.getRandomIndexes(list.length - 1, 10);

        let questions = [];
        for (let i = 0; i < indexes.length; i++) {
            questions.push(db.getItem(list[indexes[i]].key));
        }
        let quiz = [];

        for (let i = 0; i < indexes.length; i++) {
            let scramble = this.getRandomIndexes(3, 4);
            let answers = [];
            let correct;
            for (let j = 0; j < scramble.length; j++) {
                switch (scramble[j]) {
                    case 0:
                        answers.push(questions[i].props.answer);
                        correct = i;
                        break;
                    case 1:
                        answers.push(questions[i].props.falseAnswer1);
                        break;
                    case 2:
                        answers.push(questions[i].props.falseAnswer2);
                        break;
                    case 3:
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
        return quiz;
    }

    getRandomIndexes(max, num) {
        const randomizer = require('../other/randomInt');

        let indexes = [];
        for (let i = 0; i <= num; i++) {
            let r = randomizer.getRandomInt(0, max);
            while (this.checkForIndex(r, indexes)) {
                r = (r + 1) % max;
            }
            indexes.push(r);
        }
        return indexes;
    }

    checkForIndex(index, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == index) return true;
        }
        return false;
    }
}

module.exports = new TabooCreator();