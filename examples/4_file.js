let Krm = require('krm');
let krm = new Krm();

krm.add('/메모 [:text]', (msg, reply) => {
    let json = krm.File.readJson('memo') || {};
    json[msg.sender] = msg.params.text;
    krm.File.writeJson('memo', json);
    reply.text('저장되었습니다.');
});

krm.add('/메모', (msg, reply) => {
    let json = krm.File.readJson('memo') || {};
    reply.text(json[msg.sender] || '저장된 메모가 없습니다.');
});

let { response } = krm;
