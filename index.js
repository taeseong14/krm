let { add, response } = require('./utils');

function Krm() {
    this.handlers = [];
    this.response = response.bind(this);
    this.add = add;
}


module.exports = Krm;