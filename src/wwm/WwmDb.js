const db = require('@cyclic.sh/dynamodb');

class wwmDb extends Function {
    constructor(props) {
        super(props);
    }
    async getList() {
        const items = await db.collection('wwm').list();
        console.log('Full List');
        console.log(items);
        return items;
    }
}
    
module.exports = new wwmDb();