//Verwaltet den Zugriff auf die Datenbank für das Taboo-Spiel
class TabooDb extends Function {
    constructor(props) {
        super(props);
    }
    // Gibt den Namen der Datenbankkollektion zurück
    getCollection() {
        return 'taboo';
    }
    // Ruft Quizdaten aus der Datenbank ab, basierend auf der Anzahl der Spieler
    async getTabooQuiz(userCount) {
        const db = require('../other/database');
        const randomizer = require('../other/randomInt');
        let list = await db.getFullList(this.getCollection());
        let quiz = [];
        let usedIndexes = [];
        let max = list.results.length - 1;
         // Schleife zum Zusammenstellen des Quiz basierend auf der Anzahl der Spieler
        for (let i = 0; i < userCount; i++) {
            let r = randomizer.getRandomInt(0, max);
            // Überprüft, ob der Index bereits verwendet wurde
            while (this.checkIfUsed(r, usedIndexes)) {
                r = (r + 1) % (max + 1);
            }
            usedIndexes.push(r);
            quiz.push(await db.getItem(this.getCollection(), list.results[r].key));
        }

        return quiz;
    }
    // Überprüft, ob ein Index bereits verwendet wurde
    checkIfUsed(r, usedIndexes){
        for (let j = 0; j < usedIndexes.length; j++) {
            if (usedIndexes[j] == r) return true;
        }
        return false;
    }
}

module.exports = new TabooDb();
