class TabooDb extends Function {
    constructor(props) {
        super(props);
    }

    getCollection() {
        return 'taboo';
    }

    async getTabooQuiz(userCount) {
        const db = require('../other/database');
        const randomizer = require('../other/randomInt');
        let list = await db.getFullList(this.getCollection());
        let quiz = [];
        let usedIndexes = [];
        let max = list.results.length - 1;
        for (let i = 0; i < userCount; i++) {
            let r = randomizer.getRandomInt(0, max);
            while (this.checkIfUsed(r, usedIndexes)) {
                r = (r + 1) % (max + 1);
            }
            usedIndexes.push(r);
            quiz.push(await db.getItem(this.getCollection(), list.results[r].key));
        }

        return quiz;
    }

    checkIfUsed(r, usedIndexes){
        for (let j = 0; j < usedIndexes.length; j++) {
            if (usedIndexes[j] == r) return true;
        }
        return false;
    }
}

module.exports = new TabooDb();
