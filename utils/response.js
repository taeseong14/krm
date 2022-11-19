/**
 * @typedef Replier
 * @property {function} reply
 */
/**
 * @typedef ImageDB
 * @property {string} profileHash
 */

/**
 * @param {string} room 
 * @param {string} msg 
 * @param {string} sender 
 * @param {boolean} igc 
 * @param {Replier} replier 
 * @param {ImageDB} imageDB 
 * @param {string} packageName 
 */
function response(room, msg, sender, igc, replier, imageDB, packageName) {
    this.handlers.forEach(h => {
        let { pattern, handler } = h;
        let params = {};
        pattern = pattern.replace(/\[\:([^ ]+)\]/g, (a, b) => {
            return params[b] = '([^]+)';
        });
        let regex = new RegExp(pattern);
        if (msg.match(regex)) {
            // params
            let match = msg.match(regex);
            for (let i = 0; i < match.length - 1; i++) {
                let key = Object.keys(params)[i];
                params[key] = match[i + 1];
            }
            handler({
                text: msg,
                params: params
            }, {
                text: (text) => replier.reply(text),
                randomText: function () {
                    let text = arguments[Math.floor(Math.random() * arguments.length)];
                    this.text(text);
                },
                kakaolink: () => { }
            });
        }
    });
}

module.exports = response;