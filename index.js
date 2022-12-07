(function () {
    let { add, use, file, rand, date, ify } = require('./src/utils');
    const response = require('./src/response');

    function Krm() {
        this.handlers = [];

        this.add = add;
        this.use = use;

        this.File = file;
        this.Rand = rand;
        this.date = date;
        this.ify = ify;

        /** @type {import('./src/response')} */
        this.response = response.bind(this);

        this.prefix = '';
        this.setPrefix = p => this.prefix = p;
    }

    if (this.Log) Log.clear();

    module.exports = Krm;
})();