/**
 * @typedef Message
 * @property {string} text
 * @property {object} params
 * @property {string} room
 * @property {string} sender
 * @property {boolean} igc
 * @property {string} packageName
 * @property {ImageDB} imageDB
 * @property {number} profileHash
 * @property {number} now
 */
/**
 * @typedef Reply
 * @property {import('./response').text} text
 * @property {import('./response').textTo} textTo
 * @property {import('./response').randomText} randomText
 * @property {import('./response').kakaolink} kakaolink
 * @property {import('./response').delay} delay
 * @property {import('./response').read} read
 */

/**
 * @callback Handler
 * @param {Message} msg
 * @param {Reply} reply
 * @param {function} next
 */


module.exports = {
    add: require('./add'),

    use: require('./use'),

    file: require('./file'),

    rand: require('./rand'),

    date: require('./date'),

    ify: require('./ify')
}