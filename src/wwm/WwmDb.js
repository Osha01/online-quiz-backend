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
    async getFilteredList(userCount){
        let fullList = await this.getList();
        let filteredList = [];
        for (let i = 0; i < fullList.results.length; i++) {
            let item = await this.getItem(fullList.results[i].key);
            console.log('item: ' + i);
            console.log(item);
            if (item.props.userCount % userCount == 0){
                filteredList.push(fullList.results[i]);
            }
        }
        console.log('Filtered List:')
        console.log(filteredList);
        return filteredList;
    }
 
}

    
module.exports = new wwmDb();