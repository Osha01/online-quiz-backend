
class dominoCorrector extends Function() {
    constructor(props) {
        super(props);
    }
    getErgebnisFormular(body) {
        let feld = body.feld
        let questions = body.questions
        console.log(feld)
        console.log(questions)

        let correctAnswers = this.getCorrectAnswers(feld, questions)
        let wrongAnswers = this.getWrongAnswers(correctAnswers, questions)

        let res = { correctAnswers: correctAnswers, wrongAnswers: wrongAnswers }
        console.log("correct" + correctAnswers)
        console.log("wrong" + wrongAnswers)
        return res;
    }

    getCorrectAnswers(feld, questions) {
        let ausrichtungStein
        let correctAnswers = []
        let wrongAnswers = []
        let frage;
        let antwort;
        console.log("Start Tour durch das Feld ...")
        //Feld durchlaufen
        for (let i = 0; i < feld.length; i++) {
            for (let j = 0; j < feld[i].zellen.length; j++) {
                console.log("zelle " + i + "|" + j + " wird angeschaut. ")
                let zelle = feld[i].zellen[j]

                if (zelle.stone.id != "") {
                    if (i == feld.length - 1 && j == feld[i].zellen[j].length - 1) {
                        //letzte zellen nichts mehr machen
                        console.log("Ist die letzte Zelle")
                    } else if (i == feld.length - 1) {
                        //letzte zeile nicht unten drunter suchen
                        console.log("Ist in der letzten zeile nicht unten schauen")

                        if (feld[i].zellen[j + 1].stone.id != "") {
                            console.log("zelle nebendran " + i + "|" + j + 1 + " hat einen Stein")

                            //Stein neben an
                            ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                            let nebenStein = this.getStoneAusrichtung(feld[i].stone[j + 1].stone)
                            let ok = this.getNachbarNebenRichtung(nebenStein)
                            console.log("Ausrichtungen die Erlaubt sind " + ok + " und die vom Nachbarn " + nebenStein)

                            //Steine liegen richtig zueinander
                            if (ok.includes(nebenStein)) {
                                console.log("Ist erlaubt ")

                                //Frage und Antwort stimmen
                                frage = feld[i].zellen[j].stone.frage
                                antwort = feld[i].zellen[j + 1].stone.antwort
                                console.log("frage1 " + frage + "  antwort1" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                    console.log("STimmt 1")
                                }
                                console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
                                frage = feld[i].zellen[j + 1].stone.frage
                                antwort = feld[i].zellen[j].stone.antwort
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 2")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                            }
                        }
                    } else if (j == feld[i].length - 1) {
                        console.log("Zelle ist in der letzten Spalte")
                        //letzte Spalte nicht neben dran suchen 
                        //nächste Zeile ein Stein?
                        if (feld[i + 1].zellen[j].stone.id != "") {
                            console.log("zelle " + i + 1 + "|" + j + " hat ein Stein ")

                            ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                            let untererStein = this.getStoneAusrichtung(feld[i + 1].stone[j].stone)
                            let ok = this.getNachbarUntenRichtung(untererStein)
                            console.log("Ausrichtungen die Erlaubt sind " + ok + " und die vom Nachbarn " + untererStein)
                            if (ok.includes(untererStein)) {
                                //Steine liegen richtig zueinander
                                let frage = feld[i].zellen[j].stone.frage
                                let antwort = feld[i + 1].zellen[j].stone.antwort
                                console.log("frage1 " + frage + "  antwort1" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 1")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                                frage = feld[i + 1].zellen[j].stone.frage
                                antwort = feld[i].zellen[j].stone.antwort
                                console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 2")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                            }
                        }
                    }
                    else {
                        console.log("Normale Zelle " + i + "|" + j)
                        //nächste Zeile ein Stein?
                        if (feld[i + 1].zellen[j].stone.id != "") {
                            console.log("Stein unten drunter " + i + 1 + "|" + j)
                            ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                            let untererStein = this.getStoneAusrichtung(feld[i + 1].stone[j].stone)
                            let ok = this.getNachbarUntenRichtung(untererStein)
                            if (ok.includes(untererStein)) {
                                //Steine liegen richtig zueinander
                                let frage = feld[i].zellen[j].stone.frage
                                let antwort = feld[i + 1].zellen[j].stone.antwort
                                console.log("frage1 " + frage + "  antwort1" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                                frage = feld[i + 1].zellen[j].stone.frage
                                antwort = feld[i].zellen[j].stone.antwort
                                console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 2")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                            }
                        }
                        if (feld[i].zellen[j + 1].stone.id != "") {
                            console.log("zelle " + i + "|" + j + 1 + " nebendran hat einen Stein")
                            //Stein neben an
                            ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                            let nebenStein = this.getStoneAusrichtung(feld[i + 1].stone[j].stone)
                            let ok = this.getNachbarUntenRichtung(untererStein)
                            if (ok.includes(untererStein)) {
                                //Steine liegen richtig zueinander
                                frage = feld[i].zellen[j].stone.frage
                                antwort = feld[i + 1].zellen[j].stone.antwort
                                console.log("frage1 " + frage + "  antwort1" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 1")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                                frage = feld[i + 1].zellen[j].stone.frage
                                antwort = feld[i].zellen[j].stone.antwort
                                console.log("umgekehrt frage2 " + frage + "  antwort2" + antwort)
                                if (this.frageStimmt(frage, antwort, questions)) {
                                    console.log("STimmt 2")
                                    correctAnswers.push({ frage: frage, antwort: antwort })
                                }
                            }

                        }
                    }

                }
            }
        }
    }
    getWrongAnswers(correctAnswers, questions) {
        let wList = []

        if (correctAnswers == undefined) {
            return questions;
        } else {
            for (let i = 0; i < question.length; i++) {
                if (correctAnswers.forEach(answer => answer.frage != questions[i].frage)) {
                    console.log("Nicht in der Liste" + questions[i])
                    wList.push(questions[i])
                }
            }
        }
        return wList;
    }
    frageStimmt(frage, antwort, questions) {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].frage == frage && questions[i].antwort == antwort) {
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

}
module.exports = new dominoCorrector();
