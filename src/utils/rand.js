(function () {
    /**
     * range n1 ~ n2 | 0 ~ n1
     * @param {number} n1 
     * @param {number} [n2] 
     * @returns {number}
     */
    function range(n1, n2) {
        if (n2 === undefined) {
            n2 = n1;
            n1 = 0;
        }
        return Math.random() * (n2 - n1) + n1;
    }

    /**
     * randInt n1 ~ n2 | 0 ~ n1
     * @param {number} n1 
     * @param {number} [n2] 
     * @returns {number}
     */
    function randInt(n1, n2) {
        if (n2 === undefined) {
            n2 = n1;
            n1 = 0;
        }
        return Math.floor(range(n1, n2 + 1));
    }

    /**
     * randItem from array
     * @param {any[]} arr 
     * @returns {any} random element
     */
    function fromArray(arr) {
        return arr[randInt(arr.length - 1)];
    }


    module.exports = {
        range: range,
        randInt: randInt,
        fromArray: fromArray,
        fromArr: fromArray, // alias
    }
})();