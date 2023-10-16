export default async function(body) {
    if (body.type == 1) {
        // const kwNew = require('./kreuzwortNew')
        // let res = await kwNew(body)
        // return res;
        return {
            Test: 'hat geklappt'
        }
    }
    if (body.type == 0) {
        const kwUpdate = require('./kreuzwortUpdate')
        let res = await kwUpdate(body)
        return res
    }
}
        