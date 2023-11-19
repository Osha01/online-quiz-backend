const db = require('./database');
const rng = require('./randomInt');

class Lobby extends Function {
    getLobbyCollection() {
        return 'lobbies';
    }

    async getNewCode() {
        let newCode = await this.generateCode();
        await db.setItem(this.getLobbyCollection(), '' + newCode);
        return {
            code: newCode
        }
    }

    async deleteCode(body) {
        await db.deleteItem(this.getLobbyCollection(), body.key)
    }

    async generateCode() {
        let newCode = rng.getRandomInt(10000, 99999);
        let list = await db.getFullList(this.getLobbyCollection());
        if (list.results.length != 0) {
            let found = false;
            let counter = 0;
            do {
                found = false;
                for (let i = 0; i < list.results.length; i++) {
                    if (list.results[i].key == '' + newCode) found = true;
                }
                if (found) newCode++;
            } while (!found && counter++ < 100000)
        }
        return newCode;
    }
}

module.exports = new Lobby;