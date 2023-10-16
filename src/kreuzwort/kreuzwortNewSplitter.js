export default function(quiz, users, room){
    const pusher = require("./kreuzwortPusher")
    const quizOut = {
        key: quiz.key,
        lines: []
    }
    let userIndex = 0
    for (let i = 0; i < quiz.lines.length; i++){
        let tmp = {
            id: quiz.lines[i].id,
            length: quiz.lines[i].answer.length,
            msp: quiz.lines[i].msp,
            user: users[userIndex++],
            question: quiz.lines[i].question,
            answer: quiz.lines[i].answer
        }
        quizOut.lines.push(tmp)
        if (userIndex >= users.length) {
            userIndex = 0
        }
    }
    pusher(room, 'start', quizOut)

    return quizOut
}