let { add, use, response } = require('./utils');

function Krm() {
    this.handlers = [];
    this.response = response.bind(this);
    this.add = add;
    this.use = use;
}


module.exports = Krm;