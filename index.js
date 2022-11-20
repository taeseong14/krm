let { add, use, file, rand, ify, response } = require('./utils');

function Krm() {
    this.handlers = [];

    this.add = add;
    this.use = use;

    this.File = file;

    this.Rand = rand;

    this.ify = ify;

    /** @type {import('./utils/response')} */
    this.response = response.bind(this);
}


module.exports = Krm;