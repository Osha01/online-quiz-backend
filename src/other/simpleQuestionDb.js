class SimpleQuestionDb extends Function {
    async getFullList() {
        const db = require('./database');
        const items = await db.getFullList('simpleQuestion');
        return items;
    }

    async getItem(key) {
        const db = require('./database');
        const item = await db.getItem('simpleQuestion', key);
    }
}

module.exports = new SimpleQuestionDb;