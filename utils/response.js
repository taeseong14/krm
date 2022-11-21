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
 * @param {number} template_id
 * @param {object} [template_args]
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

    let { Rand, File, Date } = this;

    if (msg === '/krm info') {
        let time = File.read('krm_info');
        if (time > Date.now() - 1000) return;
        replier.reply('krm v1.1.0\nhttps://github.com/taeseong14/krm');
        File.write('krm_info', Date.now());
    }

    this.handlerMsg = {
        text: msg,
        room: room,
        sender: sender,
        igc: igc,
        packageName: packageName,
        imageDB: imageDB,
        profileHash: imageDB.profileHash,
        now: Date.now(),
    }

    this.handlerReply = {
        /** @type {text} */
        text: function () {
            replier.reply(Array.from(arguments).join(' '));
            return this.handlerReply;
        },
        /** @type {textTo} */
        textTo: (room, text) => {
            replier.replyRoom(room, text);
            return this.handlerReply;
        },
        /** @type {randomText} */
        randomText: function () {
            let text = Rand.fromArray(arguments);
            this.text(text);
            return this.handlerReply;
        },
        /** @type {kakaolink} */
        kakaolink: (template_id, tamplate_args, room) => { // 모듈 넣기 전
            this.handlerReply.text('github.com/taeseong14/krm-modules의 krm-kakaolink 모듈을 받아주세요.');
        },
        /** @type {delay} */
        delay: (ms) => {
            java.lang.Thread.sleep(ms);
            return this.handlerReply;
        },
        /** @type {read} */
        read: () => {
            replier.markAsRead();
            return this.handlerReply;
        }
    }

    this.handlers.forEach(handler => { // check modules
        if (handler[0].module)
            handler[0].handler(this.handlerMsg, this.handlerReply, () => { });
    });

    a: for (let i = 0; i < this.handlers.length; i++) {
        let h = this.handlers[i];

        for (let j = 0; j < h.length; j++) {
            let h2 = h[j];
            let { pattern, handler, module } = h2;
            if (module) continue;
            let params = {};
            pattern = pattern.replace(/\[\:([^ ?]+)\]/g, (a, b) => {
                return params[b] = '((?:(?:[^ ]+ *)(?![^ ]+$))+)';
            });
            pattern = pattern.replace(/\[\:([^ ?]+)\?\]/g, (a, b) => {
                return params[b] = '?(.*)';
            });

            if (pattern === '*' || msg.match(new RegExp('^' + pattern + '$'))) {
                let next = false;
                if (pattern !== '*') {
                    let match = msg.match(new RegExp(pattern));
                    for (let k = 0; k < match.length - 1; k++) {
                        let key = Object.keys(params)[k];
                        params[key] = match[k + 1].trim();
                    }
                }
                this.handlerMsg.params = params;

                handler(this.handlerMsg, this.handlerReply, () => {
                    next = true;
                });

                if (!next) break a;
            }
        }
    }
}

module.exports = response;