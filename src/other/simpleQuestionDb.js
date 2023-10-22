class SimpleQuestionDb extends Function {
    async getFullList() {
        const db = require('./database');
        const items = await db.getFullList('simpleQuestion');
        return items;
    }

    async getWwmList(){
        let full = await this.getFullList();
        let results = [];
        for (let i = 0; i < full.results.length; i++){
            let item = await this.getItem(full.results[i].key);
            if (item.props.answerCount == 4) {
                results.push(item);
            }
        }
        return results;
    }

    async getItem(key) {
        const db = require('./database');
        const item = await db.getItem('simpleQuestion', key);
    }
}

module.exports = new SimpleQuestionDb;