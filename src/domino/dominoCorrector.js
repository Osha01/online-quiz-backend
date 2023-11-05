
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
        console.log(rows)
        console.log(this.correctQuestions)

        this.correctAnswers = this.getCorrectAnswers(rows)
        this.wrongAnswers = this.getWrongAnswers()

        let res = { correctAnswers: this.correctAnswers, wrongAnswers: this.wrongAnswers }
        console.log("correct" + this.correctAnswers)
        console.log("wrong" + this.wrongAnswers)
        return res;
    }

    getCorrectAnswers(rows) {
        console.log("Start Tour durch das rows ...")
        //rows durchlaufen
        //Zeilen: 
        for (let i = 0; i < rows.length; i++) {
            //Spalten: 
            for (let j = 0; j < rows[i].columns.length; j++) {
                console.log("zelle " + i + "|" + j + " wird angeschaut. ")
                let zelle = rows[i].columns[j]

                if (zelle.stone.id != "") {
                    console.log("Es liegt ein Stein: " + zelle.stone)

                    if (i == rows.length - 1 && j == rows[i].columns[j].length - 1) {
                        //letzte columns nichts mehr machen
                        console.log("Ist die letzte Zelle")

                    } else {


                        //nächste Zeile ein Stein?
                        if (i != rows.length - 1 && rows[i + 1].columns[j].stone.id != "") {
                            console.log("Unten suchen erlaubt Zelle " + i + "|" + j)
                        }
                        if (j != rows[i].length - 1 && rows[i].columns[j + 1].stone.id != "") {
                            console.log(" unten suchen erlaubt zelle " + i + "|" + j)
                            //Stein neben an


                        }
                    }

                }
            }
        }
    }
    checkNextToStone(stone, nextStone) {
        console.log("Stein: " + stone)
        console.log("Stein neben an: " + nextStone)

        ausrichtungStein = this.getStoneAusrichtung(rows[i].stone[j].stone)
        let nebenStein = this.getStoneAusrichtung(rows[i + 1].stone[j].stone)
        let ok = this.getNachbarUntenRichtung(untererStein)

        if (ok.includes(untererStein)) {
            //Steine liegen richtig zueinander
            frage = stone.frage
            antwort = nextStone.antwort
            console.log("frage1 " + frage + "  antwort1" + antwort)
            if (this.frageStimmt(frage, antwort, questions)) {
                console.log("STimmt 1")
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
            frage = nextStone.frage
            antwort = stone.antwort
            console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
            if (this.frageStimmt(frage, antwort, questions)) {
                console.log("STimmt 2")
                this.correctAnswers.push({ frage: frage, antwort: antwort })
            }
        }
    }
    checkUnderStone(stone, bottomStone) {
        console.log("Stein unten drunter " + i + 1 + "|" + j)
        ausrichtungStein = this.getStoneAusrichtung(rows[i].stone[j].stone)
        let untererStein = this.getStoneAusrichtung(rows[i + 1].stone[j].stone)
        let ok = this.getNachbarUntenRichtung(untererStein)
        if (ok.includes(untererStein)) {
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
        return wList;
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
                return 0
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
                return 0
                break;
            case "nw":
                return ["n", "no", "nw"]
        }
    }
    getNachbarNebenRichtung(richtung) {
        switch (richtung) {
            case "n":
                return 0
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
                return 0
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
}
module.exports = new dominoCorrector();
