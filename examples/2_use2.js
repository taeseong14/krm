// krm.use for adding a module
let Krm = require('krm');
let krm = new Krm();

krm.use(require('krm-kakaolink')('email@email.com', 'password', 'jskey', 'http://example.com'));

krm.add('/카링', (msg, reply) => {
    reply.kakaolink(1234, {
        title: 'title',
        desc: 'description'
    });
});

let { response } = krm;
