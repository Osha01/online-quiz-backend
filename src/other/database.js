const db = require('@cyclic.sh/dynamodb');

class DataBase extends Function {
    async getFullList(collection) {
        const items = await db.collection(collection).list();
        console.log(items);
        return items;
    }

    async getFilteredListByLessonOrCourse(collection, course, lesson){
        let fullList = await this.getList(collection);
        let filteredList = [];
        for (let i = 0; i < fullList.results.length; i++) {
            let item = await this.getItem(fullList.results[i].key);
            if (course != '') {
                if (lesson != '') {
                    if (course == item.props.course && lesson == item.props.lesson) filteredList.push(item);
                }
                else {
                    if (course == item.props.course) filteredList.push(item);
                }
            }
            else {
                filteredList.push(item);
            }
        }
        console.log(filteredList);
        return filteredList;
    }

    async getItem(collection, key) {
        const item = await db.collection(collection).get(key);
        return item;
    }

    async setItem(collection, key, body){
        await db.collection(collection).set(key, body);
    }

    async getNextKey(){
        let last = await this.getItem('keys', '0');
        let key = last.props.key + 1;
        await this.setItem('keys', '0', { key: key });
        return key + '';
    }

    async deleteItem(collection, key){
        await db.collection(collection).delete(key);
    }
}

module.exports = new DataBase;