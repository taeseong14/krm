let { add, use, response, file, rand } = require('./utils');

function Krm() {
    this.handlers = [];

    /** @type {import('./utils/response')} */
    this.response = response.bind(this);

    this.add = add;
    this.use = use;

    this.File = file;

    this.Rand = rand;
}


module.exports = Krm;