const db = require('./database');

class SimpleQuestionDb extends Function {
    async getFullList() {
        const items = await db.getFullList('simpleQuestion');
        console.log('Full List');
        //console.log(items);
        return items;
    }

    async getWwmList(){
        let full = await this.getFullList();
        let results = [];
        for (let i = 0; i < full.results.length; i++){
            let item = await this.getItem(full.results[i].key);
            if (item.props.answerCount == 4) {
                results.push(full.results[i]);
            }
        }
        console.log(results);
        return results;
    }

    async getItem(key) {
        const item = await db.getItem('simpleQuestion', key);
        return item;
    }
}

module.exports = new SimpleQuestionDb;