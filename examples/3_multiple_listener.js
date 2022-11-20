let Krm = require('krm');
let krm = new Krm();

let admin = [12345678, 87654321];

function checkAdmin(msg, reply, next) {
    if (admin.includes(msg.profileHash)) next();
    else reply.text('권한이 없습니다.');
}

krm.add('/eval [:code]', checkAdmin, (msg, reply) => {
    try {
        reply.text(eval(msg.params.code));
    } catch (e) {
        reply.text(e);
    }
});

krm.add('/관리자추가 [:hash]', checkAdmin, (msg, reply) => {
    admin.push(msg.params.hash);
    reply.text('추가되었습니다.');
});

let { response } = krm;
