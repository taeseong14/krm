/**
 * @typedef Replier
 * @property {function} reply
 * @property {function} replyRoom
 * @property {function} markAsRead
 */
/**
 * @typedef ImageDB
 * @property {string} profileHash
 */


/**
 * @callback text
 * @param {...string} text
 * @returns {import('./').Reply}
 */
/**
 * @callback textTo
 * @param {string} room 
 * @param {string} text 
 * @returns {import('./').Reply}
 */
/**
 * @callback randomText
 * @param  {...string}
 * @returns {import('./').Reply}
 */
/**
 * @callback kakaolink
 * @param {number} templete_num
 * @param {object} [templete_args]
 * @param {string} [room]
 * @returns {boolean}
 */
/**
 * @callback delay
 * @param {number} ms miliseconds
 * @returns {import('./').Reply}
 */
/**
 * @callback read
 * @returns {import('./').Reply}
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

    if (msg === '/krm info')
        replier.reply('krm v1.0.8\nhttps://github.com/taeseong14/krm');

    let handlerMsg = {
        text: msg,
        room: room,
        sender: sender,
        igc: igc,
        packageName: packageName,
        imageDB: imageDB,
        profileHash: imageDB.profileHash,
        now: Date.now(),
    }

    let handlerReply = {
        /** @type {text} */
        text: function () {
            replier.reply(Array.from(arguments).join(' '));
            return handlerReply;
        },
        /** @type {textTo} */
        textTo: (room, text) => {
            replier.replyRoom(room, text);
            return handlerReply;
        },
        /** @type {randomText} */
        randomText: function () {
            let text = this.Rand.fromArray(arguments);
            this.text(text);
            return handlerReply;
        },
        /** @type {kakaolink} */
        kakaolink: (templete_num, templete_args, room) => {
            handlerReply.text('카카오링크는 아직 개발중입니다!'); // 만드는중
        },
        /** @type {delay} */
        delay: (ms) => {
            java.lang.Thread.sleep(ms);
            return handlerReply;
        },
        /** @type {read} */
        read: () => {
            replier.markAsRead();
            return handlerReply;
        }
    }


    a: for (let i = 0; i < this.handlers.length; i++) {
        let h = this.handlers[i];

        for (let j = 0; j < h.length; j++) {
            let h2 = h[j];
            let { pattern, handler } = h2;
            let params = {};
            pattern = pattern.replace(/\[\:([^ ?]+)\]/g, (a, b) => {
                return params[b] = '((?:(?:[^ ]+ *)(?![^ ]+$))+)';
            });
            pattern = pattern.replace(/\[\:([^ ?]+)\?\]/g, (a, b) => {
                return params[b] = '?(.*)';
            });
            console.log(pattern);

            if (pattern === '*' || msg.match(new RegExp(pattern))) {
                let next = false;
                if (pattern !== '*') {
                    let match = msg.match(new RegExp(pattern));
                    for (let k = 0; k < match.length - 1; k++) {
                        let key = Object.keys(params)[k];
                        params[key] = match[k + 1].trim();
                    }
                }
                handlerMsg.params = params;

                handler(handlerMsg, handlerReply, () => {
                    next = true;
                });

                if (!next) break a;
            }
        }
    }
}

module.exports = response;