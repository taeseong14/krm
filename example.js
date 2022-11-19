let Krm = require('./');
let krm = new Krm();

// add

krm.add('/hi', (msg, reply) => {
    reply.text('hello');
});

krm.add('/안녕', (msg, reply) => {
    reply.randomText('안녕하세요!', msg.sender + '님 안녕하세요!');
});


// use

krm.use((msg, reply, next) => {
    msg.encodedText = encodeURIComponent(msg.text);
    next();
});

krm.add('/구글 [:q]', (msg, reply) => {
    reply.text('https://google.com/search?q=' + msg.encodedText);
});


// 관리자 명령어

let admin = [123];

function checkAdmin(msg, reply, next) {
    if (admin.includes(msg.profileHash)) next();
    else reply.text('권한이 없습니다.');
}

krm.add('/eval [:code]', checkAdmin, (msg, reply) => {
    reply.text(eval(msg.params.code));
});

krm.add('/관리자추가 [:profileHash]', checkAdmin, (msg, reply) => {
    admin.push(msg.params.profileHash);
    reply.text('추가되었습니다.');
});


let { response } = krm;


// Debug
module.exports = response;