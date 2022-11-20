let { add, use, response, file, rand, ify } = require('./utils');

function Krm() {
    this.handlers = [];

    /** @type {import('./utils/response')} */
    this.response = response.bind(this);

    this.add = add;
    this.use = use;

    this.File = file;

    this.Rand = rand;

    this.ify = ify;
}


module.exports = Krm;