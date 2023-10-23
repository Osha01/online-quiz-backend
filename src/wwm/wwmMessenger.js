class TabooController extends Function {
    constructor(props) {
        super(props);
    }

    getChannelId(room) {
        return 'room' + room;
    }

    async sendMessages(quiz, moderator, player, room, users) {
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = this.getChannelId(room);
        const channel = ably.channels.get(channelId);

        let userToGetAnswers = player;
        if (moderator != ""){
            userToGetAnswers = moderator;
            let quizWithoutAnswers = [];
            for (let i = 0; i < quiz.length; i++) {
                quizWithoutAnswers.push({
                    question: quiz[i].question,
                    answers: quiz[i].answers
                })
            }
            let body = {
                game: 'wwm',
                users: users,
                data: {
                    moderator: moderator,
                    list: quizWithoutAnswers
                }
            }
            await channel.publish('start' + player, body);
        }
        let body = {
            game: 'wwm',
            users: users,
            data: {
                moderator: moderator,
                list: quiz
            }
        }
        await channel.publish('start' + userToGetAnswers, body);
        ably.close();
    }
}

module.exports = new TabooController();