class KreuzwortMessenger extends Function {
    constructor(props) {
        super(props);
    }

    async messageStart(quiz, users, room) {
        console.log('messageStart');
        const kwAbly = require('./kreuzwortAbly');
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = kwAbly.getStarterChannelId(room);
        const channel = ably.channels.get(channelId);

        const assignedUsers = this.assignUsersAtRandom(users.length, quiz.props.lines.length);
        
        for (let i = 0; i < users.length; i++){
            let lines = [];
            for (let j = 0; j < quiz.props.lines.length; j++){
                let line = quiz.props.lines[j];
                if (assignedUsers[j] == i){
                    lines.push({
                        id: line.id,
                        start: line.start,
                        length: line.answer.length,
                        user: users[assignedUsers[j]],
                        state: 0,
                        question : line.question
                    });
                }
                else {
                    lines.push({
                        id: line.id,
                        start: line.start,
                        length: line.answer.length,
                        state: 0,
                        user: users[assignedUsers[j]]
                    });
                }
            }
            let body = {
                game: 'kreuzwort',
                data: {
                    id: quiz.key,
                    size: quiz.props.size,
                    count: quiz.props.lines.length,
                    msp: quiz.props.msp,
                    lines: lines
                }
            }
            console.log(body);
            await channel.publish('start' + users[i], body);
            console.log('message sent to: ' + users[i]);
        }
        ably.close();
        return assignedUsers;
    }

    async messageCorrection(i, state, room){
        const kwAbly = require('./kreuzwortAbly');
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = kwAbly.getCorrectionChannelId(room);
        const channel = ably.channels.get(channelId);
        let body = {
            i: i, 
            state: state
        }
        await channel.publish('correction', body);
        ably.close();
    }

    assignUsersAtRandom(userCount, questionCount) {
        const randomizer = require('../other/randomInt');

        let res = [];
        let buckets = [];
        let perUser = questionCount / userCount;

        for(let i = 0; i < userCount; i++) {
            buckets.push(0);
        }
        for (let done = 0; done < questionCount; done++){
            let r = randomizer.getRandomInt(0, userCount - 1);
            let tryCount = 0;
            while (buckets[r] >= perUser || tryCount > userCount){
                r = (r + 1) % userCount;
                tryCount++;
            }
            res.push(r);
            buckets[r] = buckets[r] + 1;
        }
        return res;
    }
}

module.exports = new KreuzwortMessenger;