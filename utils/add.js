/**
 * @typedef Message
 * @property {string} text
 * @property {object} params
 */
/**
 * @typedef Reply
 * @property {function} text
 * @property {function} randomText
 * @property {function} kakaolink
 */
/**
 * @callback Handler
 * @param {Message} msg
 * @param {Reply} reply
 */

/**
 * Run handler if msg matches pattern
 * @param {string} pattern 
 * @param {Handler} handler 
 */
function add(pattern, handler) {
    if (!typeof pattern === 'string')
        throw new Error('pattern must be a string');
    if (!typeof handler === 'function')
        throw new Error('handler must be a function');

    this.handlers.push({
        pattern: pattern,
        handler: handler
    });
}

module.exports = add;