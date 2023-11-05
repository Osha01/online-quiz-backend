
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

        this.correctAnswers = this.getCorrectAnswers(rows)
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
        let lastRow = rows.length - 1;
        let lastColumn = rows[0].columns.length - 1;
        console.log("lastRow " + lastRow + " lastColumn " + lastColumn)
        //rows durchlaufen
        //Zeilen: 
        for (let row = 0; row < rows.length; row++) {
            //Spalten: 
            for (let column = 0; column < rows[row].columns.length; column++) {
                console.log("zelle " + row + "|" + column + " wird angeschaut. ")
                observedStone = rows[row].columns[column].stone;

                if (observedStone.id != "") {
                    console.log("Es liegt ein Stein: " + observedStone.id)
                    //letzte Zelle nichts mehr machen
                    if (row == lastRow && column == lastColumn) {

                        console.log("Ist die letzte Zelle")

                    }
                    //letzte Zeile nicht nach unten schauen 
                    else if (column == lastColumn) {
                        bottomStone = rows[row + 1].columns[column];
                        if (bottomStone.id != "" || bottomStone.id != undefined) {
                            console.log("Stein liegt unter der Zelle " + row + "|" + column)
                        }
                    }
                    // letzte Spalte nicht nach rechts schauen
                    else if (row == lastRow) {
                        nextStone = rows[row].columns[column + 1].stone;
                        if (nextStone.id != "" || nextStone.id != undefined) {
                            console.log("Stein liegt neben der Zellele " + row + "|" + column)
                            //Stein neben an
                            this.checkNextToStone(observedStone, nextStone)
                        }
                    } else {
                        bottomStone = rows[(row + 1)].columns[column].stone;
                        nextStone = rows[row].columns[(column + 1)].stone;
                        if (bottomStone.id != "" || bottomStone.id != undefined) {
                            console.log("Stein liegt unter der Zelle " + row + "|" + column)
                        }
                        if (nextStone.id != "") {
                            console.log("Stein liegt neben der Zellele " + row + "|" + column)
                            //Stein neben an
                            this.checkNextToStone(observedStone, nextStone)
                        }
                    }
                }
            }
        }
    }
    checkNextToStone(stone, nextStone) {
        console.log("Stein: " + stone)
        console.log("Stein neben an: " + nextStone)

        let directionStone = this.getStoneAusrichtung(stone)
        console.log(directionStone)
        let directionNextStone = this.getStoneAusrichtung(nextStone)
        console.log(directionNextStone)
        let ok = this.getNachbarNebenRichtung(directionStone)
        console.log(ok)

        if (ok.includes(directionNextStone)) {
            //Steine liegen richtig zueinander
            frage = stone.frage
            antwort = nextStone.antwort
            console.log("frage1 " + frage + "  antwort1" + antwort)
            if (this.frageStimmt(frage, antwort)) {
                console.log("STimmt 1")
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
            frage = nextStone.frage
            antwort = stone.antwort
            console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
            if (this.frageStimmt(frage, antwort)) {
                console.log("STimmt 2")
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
        }
    }
    checkUnderStone(stone, bottomStone) {
        let directionStone = this.getStoneAusrichtung(stone)
        let directionBottomStone = this.getStoneAusrichtung(bottomStone)
        let ok = this.getNachbarUntenRichtung(directionStone)
        if (ok.includes(directionBottomStone)) {
            //Steine liegen richtig zueinander
            let frage = stone.frage
            let antwort = bottomStone.antwort
            console.log("frage1 " + frage + "  antwort1" + antwort)
            if (this.frageStimmt(frage, antwort)) {
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
            frage = bottomStone.frage
            antwort = stone.antwort
            console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
            if (this.frageStimmt(frage, antwort)) {
                console.log("STimmt 2")
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
        }
    }

    getWrongAnswers() {
        this.wrongAnswers = this.correctQuestions;

        if (this.correctAnswers != undefined && this.correctAnswers != []) {
            this.correctAnswers.forEach(answer => {
                this.correctQuestions.forEach(question, index => {
                    if (question.frage == answer.frage) {
                        deleteQuestionFromWrongAnswers(index)
                    }
                });
            });
        }
        return this.wrongAnswers;

    }
    frageStimmt(frage, antwort) {
        for (let i = 0; i < this.correctQuestions.length; i++) {
            if (this.correctQuestions[i].frage == frage && this.correctQuestions[i].antwort == antwort) {
                return true;
            }
        }
        return false;

    }
    getStoneAusrichtung(stone) {
        let h = stone.h
        let fO = stone.fO
        let d = stone.d

        if (h && fO && !d) {
            //"Von Zustand 1 nach 2")
            h = false;
            fO = true;
            d = true;
            return "n"
        } else if (!h && fO && d) {
            //"Von Zustand 2 nach 3")
            fO = false
            h = false
            d = false
            return "no"
        } else if (!h && !fO && !d) {
            //"Von Zustand 3 nach 4")
            h = true;
            fO = false;
            d = true
            return "o"
        } else if (h && !fO && d) {
            //"Von Zustand 4 nach 5")
            h = true;
            fO = false;
            d = false
            return "so"
        } else if (h && !fO && !d) {
            //"Von Zustand 5 nach 6")
            fO = false
            h = false
            d = true
            return "s"
        } else if (!h && !fO && d) {
            //"Von Zustand 6 nach 7")
            fO = true
            h = false
            d = false
            return "sw"
        } else if (!h && fO && !d) {
            //"Von Zustand 7 nach 8")
            fO = true
            h = true
            d = true
            return "w"
        } else if (h && fO && d) {
            //"Von Zustand 8 nach 1")
            fO = true
            h = true
            d = false
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
