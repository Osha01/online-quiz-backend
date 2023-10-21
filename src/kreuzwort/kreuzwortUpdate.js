class KreuzwortUpdate extends Function {
    constructor(props) {
        super(props)
    }

    async checkAnswer(body){
        const messenger = require("./kreuzwortMessenger");
        const db = require('./kreuzwortDb');
        let quiz = await db.getItem(body.id);
        const state = this.getState(quiz.props.lines[body.line].answer, body.answer);
        await messenger.messageCorrection(body.line, state, body.room);
        return 'Done!';
    }

    getState(line, answer){
        console.log(line);
        console.log(answer);
        if (line.toLowerCase() == answer.toLowerCase()) return 1;
        return -1;
    }
}

module.exports = new KreuzwortUpdate;