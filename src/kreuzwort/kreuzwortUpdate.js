class KreuzwortUpdate extends Function {
    constructor(props) {
        super(props)
    }

    async checkAnswer(body){
        const messager = require("./kreuzwortMessager");
        const db = require('./kreuzwortDb');
        let quiz = await db.getItem(body.id);
        const state = this.getState(quiz.props.lines[body.line - 1].answer, body.answer);
        await messager.messageCorrection(body.line, state, body.room);
        return 'Done!';
    }

    getState(line, answer){
        console.log(line);
        console.log(answer);
        if (line.answer == answer) return 1;
        return -1;
    }
}

module.exports = new KreuzwortUpdate;