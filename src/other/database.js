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

    async getNextKey(collection){
        let items = await this.getList(collection);
        return items.length;
    }
}

module.exports = new DataBase;