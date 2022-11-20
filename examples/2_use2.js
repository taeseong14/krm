// krm.use for adding a module
let Krm = require('krm');
let krm = new Krm();

krm.use(require('krm-kakaolink')); // 추가 예정 모듈

krm.add('/카링', (msg, reply) => {
    reply.kakaolink(00000, {
        title: '카카오링크',
        description: '카카오링크를 이용한 메시지 전송'
    });
});

let { response } = krm;
