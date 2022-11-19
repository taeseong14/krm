function add(pattern, handler) {
    if (!typeof pattern === 'string')
        throw new Error('add: pattern must be a string');
    if (!typeof handler === 'function')
        throw new Error('add: handler must be a function');

    this.handlers.push({
        pattern: pattern,
        handler: handler
    });
}

module.exports = add;