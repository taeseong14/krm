/**
 * Add Route with Pattern '*'
 * @param {...import('./').Handler}
 * @returns {void}
 */
function use(/** ...handler */) {
    if (arguments[1] === true) // import module
        return this.handlers.push([{
            pattern: '*',
            handler: arguments[0],
            module: true
        }]);
    let h = [];
    for (let i = 0; i < arguments.length; i++) {
        let handler = arguments[i];
        if (handler !== undefined && handler.constructor.name === 'Promise')
            return handler.then(e => this.use(e, true));
        if (typeof handler !== 'function')
            throw new Error('use: handler must be a function');
        h.push({
            pattern: '*',
            handler: handler
        });
    }
    this.handlers.push(h);
}

module.exports = use;