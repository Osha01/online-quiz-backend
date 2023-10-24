const db = require('../other/database');

class contributorController extends Function() {
    constructor(props) {
      super(props);
    }
    async getList(){
        let items = await db.getFullList('kreuzwort');
        let list = items.results;
        items = await db.getFullList('taboo');
        for (let i = 0; i < items.results.length; i++) {
            list.push(items.results[i]);
        }
        items = await db.getFullList('simpleQuestion');
        for (let i = 0; i < items.results.length; i++) {
            list.push(items.results[i]);
        }
        return {
            results: list
        };
    }

    async parsePost(req){
        switch(req.type){
            case 'change':
                await this.setItem(req);
                break;
            case 'new':
                await this.addItem(req);
                break;
            default:
                return {
                    result: 'Could not parse type: please use either change or new'
                }
        }

        return {
            result: 'success'
        }
    }

    async addItem(req){
        let key = await db.getNextKey();
        let collection = req.collection;
        let body = req.body;
        await db.setItem(collection, key, body);
    }

    async setItem(req){
        let key = req.key;
        let collection = req.collection;
        let body = req.body;
        await db.setItem(collection, key, body);
    }

    async deleteItem(req){
        let key = req.key;
        let collection = req.collection;
        await db.deleteItem(collection, key);
        return {
            result: 'success'
        }
    }
  }
  module.exports = new contributorController();
  