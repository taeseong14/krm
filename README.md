# Krm - Kakaotalkbot Route Module [1.0.4]

카카오톡봇을 전반적으로 관리해주는 모듈

예시: [example.js](example.js)

---

## 사용

### 다운로드, 설치
 - 준비중

### 모듈 불러오기
```js
let Krm = require('krm');
let krm = new Krm();
```

### 명령어 추가하기

##### 일반
```js
krm.add('/안녕', (msg, reply) => {
    reply.text('안녕!');
});
```

##### 랜덤 대답
```js
krm.add('/안녕', (msg, reply) => {
    reply.randomText('안녕!', sender + '님 안녕하세요!');
});
```

##### 카카오링크[개발중]
```js
krm.add('/카링', (msg, reply) => {
    reply.kakaolink(num, {
        title: '카링 테스트',
        desc: '안녕반갑다'
    });
});
```


### 마무리
```js
let { response } = krm; // response 생성
```

---

## 문서?

### krm

> add
```js
krm.add(pattern: string, handler: Handler);
```
 - pattern: 명령어
   - RegExp(pattern)으로 불러오니 정규식관련 텍스트는 오류 가능성 있 (고칠예정)
   - Params
     - [:param] 식으로 적으면 `[Msg].params.param`으로 꺼낼 수 있음
 - handler: [핸들러](#handler)

> use
```js
krm.use(handler: Handler);
```
 - 항상 실행 (이미 break됐을 땐 제외)
 - handler: [핸들러](#handler)

#### Handler

##### Property

 - msg
   - text: 메시지 내용
   - params: [:param]으로 생성한 객체
   - 그외 room, sender, igc, imageDB, profileHash(imageDB.profileHash), packageName

 - reply
   - text(msg): replier.reply(msg);
   - replyTo(room, msg): replier.reply(room, msg);
   - randomText(t1, t2, ..): 랜덤으로 대답
   - kakaolink(templete_num, { ...args }): 해당 방으로 카카오링크 전송
   - delay(ms): java.lang.Thread.sleep(ms);
   - read(): replier.markAsRead();

 - next
   - krm에서 기본적으론 한번 리스너를 실행한 후 멈춥니다. (뒤꺼 생략)
   - 한 챗으로 여러 명령어를 부를 수 있거나, use를 쓸 데에는 필수

```js
krm.use((msg, reply, next) => {
    if (msg.sender === '너밴') return; // 보낸사람이 너밴이면 걸러내기
    next(); // 다음 리스너 살펴봄
});
```