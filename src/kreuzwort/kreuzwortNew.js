class KreuzwortNew extends Function {
    constructor(props) {
        super(props)
    }

    async createNewKreuzwort(body) {
        const messager = require("./kreuzwortMessager")
        let quiz = await this.getRandomQuiz(body.userCount);
        await messager.messageStart(quiz, body.users, body.room);
        return 'Done!';
    }

    async getRandomQuiz(userCount) {
        const db = require('./kreuzwortDb')
        let allQuizes = await db.getFilteredList(userCount);
        let index = this.getRandomInt(0, allQuizes.length - 1);
        let key = allQuizes[index].key;
        return await db.getItem(key);
    }

    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        let res = Math.floor(Math.random() * (max - min) + min);
        console.log('Random number between ' + min + ' and ' + (max - 1) + ': ' + res);
        return res;
    }
}

module.exports = new KreuzwortNew;