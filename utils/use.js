function use(handler) {
    if (!typeof handler === 'function')
        throw new Error('use: handler must be a function');
    this.handlers.push({
        pattern: '*',
        handler: handler
    });
}

module.exports = use;