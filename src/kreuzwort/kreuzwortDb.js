const db = require('../other/database')

class KreuzwortDb extends Function {
    constructor(props) {
        super(props);
    }

    getCollection(){
        return 'kreuzwort';
    }

    async getList() {
        const items = await db.getFullList(this.getCollection());
        console.log('Full List');
        console.log(items);
        return items;
    }

    async getFilteredList(userCount){
        let fullList = await this.getList();
        let filteredList = [];
        for (let i = 0; i < fullList.results.length; i++) {
            let item = await db.getItem(this.getCollection(), fullList.results[i].key);
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

    async getItem(key) {
        const item = await db.collection(this.getCollection()).get(key)
        return item;
    }

    async getNextKey(){
        let items = await this.getList();
        return items.length;
    }
}

module.exports = new KreuzwortDb;