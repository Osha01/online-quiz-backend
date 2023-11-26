//Verwaltet die Nachrichtenübermittlung für das Taboo-Spiel 
class TabooMessenger extends Function {
    constructor(props) {
        super(props);
    }
     // Generiert die Kanal-ID basierend auf dem Raum
    getChannelId(room) {
        return 'room' + room;
    }
    // Sendet Nachrichten an die Spieler über Ably-Channel
    async sendMessages(quiz, users, room) {
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = this.getChannelId(room);
        const channel = ably.channels.get(channelId);

        let team = 0;
        let turn = 0;
        let teams;
        if (users.length >= 4) teams = 2;
        else teams = 1;
        // Iteriert durch die Spieler und sendet Nachrichten 
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let enemyTurns = [];
            let info;
            for (let j = 0; j < quiz.length; j++) {
                if (j == turn) {
                    info = {
                        answer: quiz[j].props.answer,
                        forbiddenWords: quiz[j].props.forbiddenWords
                    }
                }
                if (j % 2 != team) {
                    enemyTurns.push({
                        turn: j,
                        answer: quiz[j].props.answer,
                        forbiddenWords: quiz[j].props.forbiddenWords
                    })
                }
            }
            // Erstellt die Nachricht
            let body = {
                game: 'taboo',
                users: users,
                data: {
                    team: team,
                    teams: teams,
                    explainingTurn: turn,
                    maxTurns: users.length,
                    explainingInfo: info,
                    enemyTurns: enemyTurns
                }
            }
            await channel.publish('start' + user, body); // Sendet die Nachricht an den Spieler 
            team = (team + 1) % teams;
            turn = turn + 1;
        }
        ably.close(); // Schließt die Ably-Verbindung
    }
}

module.exports = new TabooMessenger();