class DataBase extends Function {
    async getFullList(collection) {
        const items = await db.collection(collection).list();
        console.log(items);
        return items;

    }
}

module.exports = new DataBase;