class KreuzwortMessager extends Function {
    constructor(props) {
        super(props);
    }

    async messageStart(quiz, users, room) {
        const kwAbly = require('./kreuzwortAbly');
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = kwAbly.getStarterChannelId(room);
        const channel = ably.channels.get(channelId);

        const assignedUsers = this.assignUsersAtRandom(users.length, quiz.props.lines.length);
        
        for (let i = 0; i < users.length; i++){
            let lines = [];
            let userI = 0;
            for (let j = 0; j < quiz.props.lines.length; j++){
                let line = quiz.props.lines[j];
                if (assignedUsers[userI] == i){
                    lines.push({
                        id: line.id,
                        start: line.start,
                        length: line.answer.length,
                        user: users[assignedUsers[userI]],
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
                        user: users[assignedUsers[userI]]
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
            await channel.publish('start' + users[i], body);
            userI = (userI + 1) % users.length;
        }
        ably.close();
        return quiz;
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
        channel.publish('correction', body);
        ably.close();
    }

    assignUsersAtRandom(userCount, questionCount) {
        let res = [];
        let buckets = [];
        let perUser = questionCount / userCount;

        for(let i = 0; i < userCount; i++) {
            buckets.push(0);
        }
        for (let done = 0; done < questionCount; done++){
            let r = this.getRandomInt(0, userCount - 1);
            while (buckets[r] >= perUser){
                r = (r + 1) % userCount;
            }
            res.push(r);
            buckets[r] = buckets[r] + 1;
        }
        return res;
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

module.exports = new KreuzwortMessager;