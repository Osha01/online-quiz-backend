class RandomInt extends Function {
    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        let res = Math.floor(Math.random() * (max - min) + min);
        console.log('Random number between ' + min + ' and ' + (max - 1) + ': ' + res);
        return res;
    }
}

module.exports = new RandomInt;