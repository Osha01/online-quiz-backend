class WwmAbly extends Function{
    
    constructor(props){
        super(props);
    }

    getStarterChannelId(room){
        return 'room' + room;
    }

    getCorrectionChannelId(room){
        return 'wwm' + room;
    }
}

module.exports = new WwmAbly;