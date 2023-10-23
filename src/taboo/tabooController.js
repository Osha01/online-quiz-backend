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

    async scrambleUsers(users, userCount){
        const randomizer = require('../other/randomInt');
        let scramble = [];
        let max = userCount - 1;
        for (let i = 0; i < userCount; i++){
            let r = randomizer.getRandomInt(0, max);  
            while(this.checkScrambledUsers(users[r], scramble)) {
                r = (r + 1) % max;
            }
            scramble.push(users[r]);
        }
        return scramble;
    }

    checkScrambledUsers(user, scramble) {
        for (let i = 0; i < scramble.length; i++) {
            if (scramble[i] == user) return true;
        }
        return false;
    }
}

module.exports = new TabooController();
