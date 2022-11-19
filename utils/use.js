/**
 * Add Route with Pattern '*'
 * @param {...import('./').Handler}
 * @returns {void}
 */
function use(/** ...handler */) {
    let h = [];
    for (let i = 0; i < arguments.length; i++) {
        let handler = arguments[i];
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