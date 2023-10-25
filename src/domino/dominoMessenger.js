class dominoMessenger extends Function {
  constructor(props) {
    super(props);
  }

  async sendFirstMessage(questions, users, userCount, room, gameId) {
    const db = require("./dominoDb");
    console.log("messageStart");
    const Ably = require("ably");
    const ably = new Ably.Realtime.Promise(
      "0sa0Qw.VDigAw:OeO1LYUxxUM7VIF4bSsqpHMSZlqMYBxN-cxS0fKeWDE"
    );
    let questionShow = JSON.parse(questions);
    let answers = []
    let newQuestions = []
    let keyList =[] 
    for(let i = 0 ; i<questionShow.length;++i){
      let question= questionShow[i].props.frage;
      let answer = questionShow[i].props.antwort
      console.log("Frage "+ question)
      console.log("Antwort "+ answer)
      answers.push(answer)
      newQuestions.push(question)  
      keyList.push({f: i, a: i+1})

    }
    console.log("Die Fragen "+newQuestions)
    console.log("Die KeyList "+keyList)
    let aw = answers;
    let stop = 0;
    let mixedList =[];
    for(let i = 0; i<answers.length||stop<50;){
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        let k = Math.random() * (answers.length - 0) + 0;
        if(aw[k]>-1){
          console.log("k "+k)
          mixedList.push({f: 0, a: k})
          aw[k] =-1;
          i++
        }else{
          stop++
        }
        
    }
    for(let i= 0; i<mixedList.length;i++){
      mixedList[i].f = i;
    }
    console.log(mixedList + " und "+ keyList)
    

    await ably.connection.once("connected");
    let channelId = "room" + room;
    const channel = ably.channels.get(channelId);
    let body = {
      game: "domino",
      users: users,
      data: {
        laenge: 3,
        activePlayer: users[0],
        fragen: questions,
      },
    };
    
    for (let i = 0; i < userCount; i++) {
      console.log(body);
      await channel.publish("start" + users[i], body);
      console.log("gesendet an " + users[i]);
    }
    ably.close();
  }
}
module.exports = new dominoMessenger();
