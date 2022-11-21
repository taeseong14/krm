let Krm = require('../');
let krm = new Krm();

krm.add('/시간', (msg, reply) => {
    reply.text('현재 시각은', krm.Date.format(msg.now, '년-월-일 시:분:초'), '입니다.'); // or y-M-d h:m:s
});

let { response } = krm;
