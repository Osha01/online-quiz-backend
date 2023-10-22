class WwmMessenger extends Function {
    constructor(props) {
        super(props);
    }
async messageStart(quiz, users, room) {    
    console.log('messageStart');
        const wwmAbly = require('./WwmAbly');
        const Ably = require('ably');
        const ably = new Ably.Realtime.Promise('0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE');
        await ably.connection.once('connected');
        let channelId = wwmAbly.getStarterChannelId(room);
        const channel = ably.channels.get(channelId); 
        let body = {
            game:"wwm",
            data: {
                id: question,
                id: answer1,
                id: answer2,
                id: answer3,
                id: answer4,
                id: correctAnswer 
            }

        }
       
    }
}
export default new WwmMessenger;