// TabooController: Steuert den Ablauf des Taboo-Spiels 
class TabooController extends Function {
    constructor(props) {
        super(props);
    }
    // Verarbeitet den Spielaufruf und initiiert den Spielablauf
    async parseCall(body) {
        const db = require('./tabooDb');
        const messenger = require('./tabooMessenger');
         // Ruft die Quizdaten ab
        let quiz = await db.getTabooQuiz(body.userCount);
        // Mischt die Spieler für eine zufällige Reihenfolge
        let usersScrambled = await this.scrambleUsers(body.users, body.userCount);
        // Sendet die Quiznachrichten an die Spieler
        await messenger.sendMessages(quiz, usersScrambled, body.room);
    }
    // Mischt die Spieler in zufälliger Reihenfolge
    async scrambleUsers(users, userCount){
        const randomizer = require('../other/randomInt');
        let scramble = [];
        let max = userCount - 1;
        for (let i = 0; i < userCount; i++){
            let r = randomizer.getRandomInt(0, max);  
            // Überprüft, ob der Spieler bereits gemischt wurde
            while(this.checkScrambledUsers(users[r], scramble)) {
                r = (r + 1) % max;
            }
            scramble.push(users[r]);
        }
        return scramble;
    }
    // Überprüft, ob ein Spieler bereits gemischt wurde
    checkScrambledUsers(user, scramble) {
        for (let i = 0; i < scramble.length; i++) {
            if (scramble[i] == user) return true;
        }
        return false;
    }
}

module.exports = new TabooController();
