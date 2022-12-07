(function () {
    /**
     * Add Route
     * @param {string | RegExp | string[] | RegExp[]} pattern 
     * @param {...import('.').Handler} handler
     * @returns {void}
     */
    function add(pattern, /** ... */handler) {
        if (!Array.isArray(pattern)) pattern = [pattern];
        pattern.forEach(p => {
            if (typeof p !== 'string' && !(p instanceof RegExp))
                throw new Error('add: pattern must be a string or RegExp');
        });
        let h = [];
        for (let i = 1; i < arguments.length; i++) {
            let handler = arguments[i];
            if (typeof handler !== 'function')
                throw new Error('add: handler must be a function');
            h.push({
                pattern: pattern,
                handler: handler
            });
        }
        this.handlers.push(h);
    }

    module.exports = add;
})();