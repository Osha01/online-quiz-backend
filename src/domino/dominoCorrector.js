
class dominoCorrector extends Function() {
    correctAnswers = [];
    wrongAnswers = [];
    correctQuestions = [];
    constructor(props) {
        super(props);
    }

    setDataErgebnisFormular(body) {
        let rows = body.rows
        this.correctQuestions = body.questions
        console.log(this.correctQuestions);


        this.getCorrectAnswers(rows)

        this.wrongAnswers = this.getWrongAnswers()

        let res = { correctAnswers: this.correctAnswers, wrongAnswers: this.wrongAnswers }
        console.log("correct" + this.correctAnswers)
        console.log("wrong" + this.wrongAnswers)
        return res;
    }

    getCorrectAnswers(rows) {
        console.log("Start Tour durch das rows ...")
        let bottomStone;
        let nextStone;
        let observedStone;
        let correctAnswer = undefined;
        let lastRow = rows.length - 1;
        let lastColumn = rows[0].columns.length - 1;

        //rows durchlaufen
        for (let row = 0; row < rows.length; row++) {
            //Spalten: 
            for (let column = 0; column < rows[row].columns.length; column++) {
                console.log("zelle " + row + "|" + column + " wird angeschaut. ")
                observedStone = rows[row].columns[column].stone;

                if (observedStone.id != "" && observedStone.id != undefined) {
                    console.log("Es liegt ein Stein: " + observedStone.id)
                    //letzte Zelle nichts mehr machen
                    if (row == lastRow && column == lastColumn) {
                        console.log("Ist die letzte Zelle")
                    }
                    //letzte Zeile nicht nach unten schauen 
                    else if (column == lastColumn) {
                        bottomStone = rows[row + 1].columns[column];

                        if (bottomStone.id != "" && bottomStone.id != undefined) {
                            console.log("Stein liegt unter der Zelle " + row + "|" + column)

                            correctAnswer = this.checkUnderStone(observedStone, bottomStone);
                            correctAnswer = this.addCorrectAnswer(correctAnswer);

                        }
                    }
                    // letzte Spalte nicht nach rechts schauen
                    else if (row == lastRow) {
                        nextStone = rows[row].columns[column + 1].stone;

                        if (nextStone.id != "" && nextStone.id != undefined) {
                            console.log("Stein liegt neben der Zellele " + row + "|" + column)
                            //Stein neben an
                            correctAnswer = this.checkNextToStone(observedStone, nextStone);
                            correctAnswer = this.addCorrectAnswer(correctAnswer);

                        }
                    }
                    else {
                        bottomStone = rows[(row + 1)].columns[column].stone;
                        nextStone = rows[row].columns[(column + 1)].stone;

                        console.log(bottomStone.id + "   " + nextStone.id)

                        if (bottomStone.id != "" && bottomStone.id != undefined) {
                            console.log("Stein liegt unter der Zelle " + row + "|" + column)
                            correctAnswer = this.checkUnderStone(observedStone, bottomStone);
                            correctAnswer = this.addCorrectAnswer(correctAnswer);
                        }
                        if (nextStone.id != "" && nextStone.id != undefined) {
                            console.log("Stein liegt neben der Zellele " + row + "|" + column)
                            //Stein neben an

                            correctAnswer = this.checkNextToStone(observedStone, nextStone);
                            correctAnswer = this.addCorrectAnswer(correctAnswer);

                        }
                    }
                }
            }
        }
    }
    checkNextToStone(stone, nextStone) {
        let correctAnswer;
        let directionStone = this.getStoneAusrichtung(stone)
        let directionNextStone = this.getStoneAusrichtung(nextStone)
        let ok = this.getNachbarNebenRichtung(directionStone)
        console.log(directionNextStone + " " + directionStone + " " + ok)
        if (ok.includes(directionNextStone)) {
            correctAnswer = this.getCorrectAnswer(stone, nextStone)
        }
        return correctAnswer;
    }
    checkUnderStone(stone, bottomStone) {
        let correctAnswer
        let directionStone = this.getStoneAusrichtung(stone)
        let directionBottomStone = this.getStoneAusrichtung(bottomStone)
        let ok = this.getNachbarUntenRichtung(directionStone)
        console.log(directionBottomStone + " " + directionStone + " " + ok)

        if (ok.includes(directionBottomStone)) {
            //Steine liegen richtig zueinander
            correctAnswer = this.getCorrectAnswer(stone, bottomStone);
        }

        return correctAnswer;
    }

    getCorrectAnswer(stone, stoneTwo) {
        let question1 = stone.question
        let answer1 = stoneTwo.answer
        let question2 = stoneTwo.question
        let answer2 = stone.answer

        console.log("frage1 " + question1 + "  antwort1 " + answer1)
        if (this.isQACorrect(question1, answer1)) {
            console.log("Found " + question1 + answer1)
            return { question: question1, answer: answer1, key: 1 }
        } else if (this.isQACorrect(question2, answer2)) {
            console.log("Found " + question2 + answer2)
            return { question: question2, answer: answer2, key: 4 }
        }
        return undefined;
    }
    addCorrectAnswer(correctAnswer) {
        if (correctAnswer != undefined) {
            this.correctAnswers.push(correctAnswer)
        }
        return undefined;
    }
    getWrongAnswers() {
        this.wrongAnswers = this.correctQuestions;

        if (this.correctAnswers != undefined && this.correctAnswers != []) {
            this.correctAnswers.forEach(answer => {
                this.correctQuestions.forEach(question, index => {
                    if (question.question == answer.question) {
                        deleteQuestionFromWrongAnswers(index);
                    }
                });
            });
        }
        return this.wrongAnswers;

    }
    isQACorrect(observedQuestion, observedAnswer) {

        for (const q of this.correctQuestions) {
            console.log(q.props.question + " == " + observedQuestion);
            if (q.props.question == observedQuestion) {
                console.log(q.props.question + " == " + observedAnswer);
                if (observedAnswer == q.props.answer) {
                    console.log("Found")
                    return true;
                }
            }
        }
        return false;

    }
    getStoneAusrichtung(stone) {
        let h = stone.h
        let fO = stone.fO
        let d = stone.d

        if (h && fO && !d) {
            return "w"
        } else if (!h && fO && d) {
            return "no"
        } else if (!h && !fO && !d) {
            return "s"
        } else if (h && !fO && d) {
            return "so"
        } else if (h && !fO && !d) {
            return "o"
        } else if (!h && !fO && d) {
            return "sw"
        } else if (!h && fO && !d) {
            return "n"
        } else if (h && fO && d) {
            return "nw"
        }
        else {
            //"keine Richtung gefunden");
        }
    }

    getNachbarUntenRichtung(richtung) {
        switch (richtung) {
            case "n":
                return ["n", "no", "nw"]
                break;
            case "no":
                return ["n", "no", "nw"]
                break;
            case "o":
                return ""
                break;
            case "so":
                return ["s", "so", "sw"]
                break;
            case "s":
                return ["s", "so", "sw"]
                break;
            case "sw":
                return ["s", "so", "sw"]
                break;
            case "w":
                return ""
                break;
            case "nw":
                return ["n", "no", "nw"]
        }
    }
    getNachbarNebenRichtung(richtung) {
        switch (richtung) {
            case "n":
                return ""
                break;
            case "no":
                return ["o", "no", "so"]
                break;
            case "o":
                return ["o", "no", "so"]
                break;
            case "so":
                return ["o", "no", "so"]
                break;
            case "s":
                return ""
                break;
            case "sw":
                return ["w", "nw", "sw"]
                break;
            case "w":
                return ["w", "nw", "sw"]
                break;
            case "nw":
                return ["w", "nw", "sw"]
        }
    }
    deleteQuestionFromWrongAnswers(index) {
        let nList = []
        for (let i = 0; i < this.wrongAnswers.length; ++i) {
            if (i != index) {
                nList.push(this.wrongAnswers[i])
            }
        }
        this.wrongAnswers = nList;
    }
    printStone(stone) {
        console.log("Stein: " + stone.question + ", " + stone.answer)
    }
}
module.exports = new dominoCorrector();
