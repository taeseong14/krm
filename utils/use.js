/**
 * Add Route with Pattern '*'
 * @param {import('./').Handler} handler 
 * @returns {void}
 */
function use(handler) {
    if (typeof handler !== 'function')
        throw new Error('use: handler must be a function');

    this.handlers.push({
        pattern: '*',
        handler: handler
    });
}

module.exports = use;