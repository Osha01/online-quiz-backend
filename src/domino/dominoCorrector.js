class dominoCorrector extends Function() {
    constructor(props) {
      super(props);
    }
    getErgebnisFormular(body){
        let feld = JSON.parse(body).feld
        let keyList = JSON.parse(body).keyList
        let questions = JSON.parse(body).questions
        console.log(feld)
        let Fehlerliste = getFehler(feld, questions)
        return "Hallo";
    }

    getFehler(feld, questions){
      let ausrichtungStein
      let correctAnswer=[]
      let wrongAnswer=[]
      let frage;
      let antwort;

      //Feld durchlaufen
      for(i=0;i<feld.length;i++){
        for(j=0;j<feld[i].zelle.length;j++){
          
          let zelle = feld[i].zelle[j]
          if(zelle.stone.id!=""){          
            if(i==feld.length-1&&j==feld[i].length-1){
              //letzte Zelle nichts mehr machen
            }else if(i==feld.length-1){
              //letzte zeile nicht unten drunter suchen
              if(feld[i].zelle[j+1].stone.id!=""){
                //Stein neben an
                ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                let nebenStein = this.getStoneAusrichtung(feld[i+1].stone[j].stone)
                let ok = this.getNachbarUntenRichtung(untererStein)
                //Steine liegen richtig zueinander
                if(ok.includes(nebenStein)){
                  //Frage und Antwort stimmen
                  frage = feld[i].stone[j].stone.frage
                  antwort =feld[i+1].stone[j].stone.antwort
                  if(this.frageStimmt(frage,antwort,questions)){
                    correctAnswer.push({frage: frage,antwort: antwort})
                  }
                  frage =feld[i+1].stone[j].stone.frage
                  antwort  = feld[i].stone[j].stone.antwort
                  if(this.frageStimmt(frage,antwort,questions)){
                    correctAnswer.push({frage: frage,antwort: antwort})
                  }
                }
              }
            }else if(j==feld[i].length-1){
              //letzte Spalte nicht neben dran suchen 
              //nächste Zeile ein Stein?
              if(feld[i+1].zelle[j].stone.id!=""){
                ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
                let untererStein = this.getStoneAusrichtung(feld[i+1].stone[j].stone)
                let ok = this.getNachbarUntenRichtung(untererStein)
                if(ok.includes(untererStein)){
                  //Steine liegen richtig zueinander
                  let frage = feld[i].stone[j].stone.frage
                  let antwort =feld[i+1].stone[j].stone.antwort
                  if(this.frageStimmt(frage,antwort,questions)){
                    correctAnswer.push({frage: frage,antwort: antwort})
                  }
                  frage =feld[i+1].stone[j].stone.frage
                  antwort  = feld[i].stone[j].stone.antwort
                  if(this.frageStimmt(frage,antwort,questions)){
                    correctAnswer.push({frage: frage,antwort: antwort})
                  }
                }
              }
            }
          }else{
          
          //Stein enthalten?
          if(zelle.stone.id!=""){
            //nächste Zeile ein Stein?
            if(feld[i+1].zelle[j].stone.id!=""){
              ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
              let untererStein = this.getStoneAusrichtung(feld[i+1].stone[j].stone)
              let ok = this.getNachbarUntenRichtung(untererStein)
              if(ok.includes(untererStein)){
                //Steine liegen richtig zueinander
                let frage = feld[i].stone[j].stone.frage
                let antwort =feld[i+1].stone[j].stone.antwort
                if(this.frageStimmt(frage,antwort,questions)){
                  correctAnswer.push({frage: frage,antwort: antwort})
                }
                frage =feld[i+1].stone[j].stone.frage
                antwort  = feld[i].stone[j].stone.antwort
                if(this.frageStimmt(frage,antwort,questions)){
                  correctAnswer.push({frage: frage,antwort: antwort})
                }
              }
            }
            if(feld[i].zelle[j+1].stone.id!=""){
              //Stein neben an
              ausrichtungStein = this.getStoneAusrichtung(feld[i].stone[j].stone)
              let nebenStein = this.getStoneAusrichtung(feld[i+1].stone[j].stone)
              let ok = this.getNachbarUntenRichtung(untererStein)
              if(ok.includes(untererStein)){
                //Steine liegen richtig zueinander
                frage = feld[i].stone[j].stone.frage
                antwort =feld[i+1].stone[j].stone.antwort
                if(this.frageStimmt(frage,antwort,questions)){
                  correctAnswer.push({frage: frage,antwort: antwort})
                }
                frage =feld[i+1].stone[j].stone.frage
                antwort  = feld[i].stone[j].stone.antwort
                if(this.frageStimmt(frage,antwort,questions)){
                  correctAnswer.push({frage: frage,antwort: antwort})
                }
              }
            }
          }
        }
        }
      }
    }
    getWrongAnswers(questions, correctAnswer){
      for(let i = 0; i< questions.length;i++){
        if(correctAnswer.frage==questions[i].frage){
         
        }
      }
    }
    frageStimmt(frage, antwort, questions){
      for(let i =0; i<questions.length;i++){
        if(questions[i].frage ==frage&&questions[i].antwort==antwort){
          return true;
        }
      }
      return false;

    }
    getStoneAusrichtung(stone){
      let h = stone.h
      let fO= stone.fO
      let d = stone.d

      if(h && fO && !d){
        console.log("Von Zustand 1 nach 2")
        h = false;
        fO =true;
        d = true;
        return "n"
      }else if (!h && fO && d){
        console.log("Von Zustand 2 nach 3")
        fO=false
        h= false
        d = false 
        return "no"
      }else if (!h && !fO && !d){
        console.log("Von Zustand 3 nach 4")
        h = true;
        fO = false;
        d  = true
        return "o"
      }else if(h && !fO && d){
        console.log("Von Zustand 4 nach 5")
        h = true;
        fO = false;
        d = false
        return "so"
      }else if (h && !fO && !d){
        console.log("Von Zustand 5 nach 6")
        fO=false
        h= false
        d  = true 
        return "s"  
      }else if (!h && !fO && d){
        console.log("Von Zustand 6 nach 7")
        fO=true
        h= false
        d = false
        return "sw"  
      }else if (!h && fO && !d){
        console.log("Von Zustand 7 nach 8")
        fO=true
        h= true
        d = true 
        return "w"
      }else if (h && fO && d){
        console.log("Von Zustand 8 nach 1")
        fO=true
        h= true
        d = false
        return "nw"
      }
      else {
        console.log("keine Richtung gefunden");
      }
    }

    getNachbarUntenRichtung(richtung){
      switch(richtung){
        case "n":
          return ["n","no","nw"]
          break;
        case "no":
          return ["n","no","nw"]
          break;
        case "o":
          return 0
          break;
        case "so":
          return ["s","so","sw"]
          break;
        case "s":
          return ["s","so","sw"]
          break;
        case "sw":
          return ["s","so","sw"]
          break;
        case "w":
          return 0
            break;
        case "nw":
          return ["n","no","nw"]
      }
    }
    getNachbarNebenRichtung(richtung){
      switch(richtung){
        case "n":
          return 0
          break;
        case "no":
          return ["o","no","so"]
          break;
        case "o":
          return ["o","no","so"]
          break;
        case "so":
          return ["o","no","so"]
          break;
        case "s":
          return 0
          break;
        case "sw":
          return ["w","nw","sw"]
          break;
        case "w":
          return ["w","nw","sw"]
            break;
        case "nw":
          return ["w","nw","sw"]
      }
    }

  }
  module.exports = new dominoCorrector();
  