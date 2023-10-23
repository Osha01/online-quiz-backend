class TabooMessenger extends Function {
    constructor(props) {
        super(props);
    }

    getChannelId(room) {
        return 'room' + room;
    }

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
            await channel.publish('start' + user, body);

            team = (team + 1) % teams;
            turn = turn + 1;
        }
        ably.close();
    }
}

module.exports = new TabooMessenger();