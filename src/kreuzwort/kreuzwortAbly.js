class KreuzwortAbly extends Function{
    
    constructor(props){
        super(props);
    }

    getStarterChannelId(room){
        return 'room' + room;
    }

    getCorrectionChannelId(room){
        return 'kreuzwort' + room;
    }
}

module.exports = new KreuzwortAbly;