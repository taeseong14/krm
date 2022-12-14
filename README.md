# Krm - Kakaotalkbot Route Module [v1.1.2]

카카오톡봇을 전반적으로 관리해주는 모듈. [패치노트](patchnote.md)

 - 예시: [examples](examples/)
 - 모듈: [modules](https://github.com/taeseong14/krm-modules)

---

## 사용

### 다운로드, 설치
 - [Release v1.1.2](https://github.com/taeseong14/krm/releases/tag/1.1.2) 에서 krm.zip 다운로드
 - /sdcard/msgbot/global_modules/에 압축 풀기

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
    reply.randomText('안녕!', msg.sender + '님 안녕하세요!');
});
```

##### Param 이용
```js
krm.add('/주기 [:person] [:money]', (msg, reply) => {
    let { person, money } = msg.params;
    reply.text(person + '님에게 ' + money + '원 을 주었어요.');
});
```

##### 카카오링크
```js
krm.use(require('krm-kakaolink')(email, pw, apikey, url));

krm.add('/카링', (msg, reply) => {
    reply.kakaolink(template_id, {
        ...template_args
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

> add(pattern: (string | RegExp | string[] | RegExp[]), ...handler: Handler)
```js
krm.add('/hi', (msg, reply) => {
    reply.text('hi!');
});
krm.add(/^\/hi$/, (msg, reply) => {
    reply.text('hi!!');
});
krm.add(['hi', 'hello'], (msg, reply) => {
    reply.text(msg.text);
});
```
 - pattern: 명령어
   - 형식
     - string: RegExp(pattern)으로 불러오니 정규식관련 텍스트는 오류 가능성 있 (고칠예정)
     - RegExp: 그대로
     - arr: string/RegExp배열. 그중 하나라도 만족(포함?)하면 실행
   - Params
     - [:param] -> '[msg](#msg).params.param' 으로 꺼낼 수 있음
     - [:param?] - 필수가 아닌. 
       - `/샌즈 [:one] [:two?]` 시 '/샌즈 1'에도 반응
 - handler: [핸들러](#handler)

> use(...handler: Handler)
> 
> use(krm-modules)
```js
krm.use((msg, reply, next) => {
    this.chatCount++;
    next();
});
krm.use(require('krm-kakaolink'));
```
 - 항상 실행 (이미 break됐을 땐 제외)
   - express의 cookie-parser처럼 유동적으로 모듈을 넣거나 핸들러 프로퍼티를 원하는 대로 바꾸기 가능 (예제: [example_2](examples/2_use.js))
 - handler: [핸들러](#handler)

> onerr(handler: Handler)
```js
krm.onerr = (err) => Log.e(err);
```
 - 에러가 났을 때 기본적으로 실행하는 함수


#### File

 - path foramt
   - ./path, path -> /sdcard/msgbot/files/path
   - /path -> /sdcard/msgbot/path
   - ../path -> /sdcard/path

> read(path: string): (string | null)
```js
krm.File.read(path);
```
 - 파일 읽음, 없으면 null

> write(path: string, text: (string | any)): void
```js
krm.File.write(path, text);
```
 - 파일 저장

> readJson(path: string): (object | any[] | null)
```js
krm.File.readJson(path);
```
 - json 읽기

> writeJson(path: string, obj: object): void
```js
krm.File.writeJson(path, object);
```
 - json파일 저장. path가 .json으로 끝나지 않을 시 자동으로 붙임. 예시: [example_4](examples/4_file.js)


#### Rand

> range(n1: number): number
> 
> range(n1: number, n2: number): number
```js
krm.Rand.range(10);
krm.Rand.range(1, 10);
```
 - 0 ~ n1 range
 - n1 ~ n2 range

> randInt(n1: number): number
> 
> randInt(n1: number, n2: number): number
```js
krm.Rand.randInt(5);
krm.Rand.randInt(1, 5);
```
 - 0 ~ n1 int
 - n1 ~ n2 int

> fromArray(arr: any[]): any
```js
krm.Rand.fromArray([1, 2, 3]);
```
 - Random element from an Array


#### date

> format(date: (number | Date), format?: string): string
```js
// 2022/01/05 08:26:01 기준
krm.add('/시간', (msg, reply, next) => {
    reply.text(krm.date.format(msg.now, '년-월-일 시:분:초'));
    // 2022-1-5 8:26:1
    next(); // 응답이 복사가 된다고?
}, (msg, reply) => {
    reply.text(krm.date.format(msg.now, '년년-월월-일일 시시:분분:초초'));
    // 22-01-05 08:26:01
});
```
 - format
   - (yyyy | y) - 2022, yy - 22 (Y/y)
   - MM - 01, m - 1
   - dd - 01, d - 1 (D/d)
   - hh - 01, h - 1 (H/h)
   - mm - 01, m - 1
   - ss - 01, s - 1 (S/s)
   - 오전오후는 귀찮아서 안넣음 (java.text.Simple어쩌구 쓰세여)


#### Handler

> Params

 - ##### msg
   - text: 메시지 내용
   - params: [:param]으로 생성한 객체
   - 그외 room, sender, igc, imageDB, profileHash(imageDB.profileHash), packageName
   - now: timestamp (=Date.now())

 - reply
   - 메소드들은 reply객체를 리턴함 -> .text().text() 등등 가능 [.kakaolink() 제외]
   - text(msg): replier.reply(msg);
   - replyTo(room, msg): replier.reply(room, msg);
   - randomText(t1, t2, ..): 랜덤으로 대답
   - kakaolink(template_id, { ...template_args }): 해당 방으로 카카오링크 전송
   - delay(ms): java.lang.Thread.sleep(ms);
   - read(): replier.markAsRead();

 - next
   - krm에서 기본적으론 한번 리스너를 실행한 후 멈춥니다. (뒤꺼 생략)
   - 한 루트에 여러 리스너를 달 때나, use를 쓸 데에는 필수

```js
krm.use((msg, reply, next) => {
    if (msg.sender === '너밴') return; // 보낸사람이 너밴이면 걸러내기
    next(); // 다음 리스너 살펴봄
});
```


#### Prefix 기능

> krm.setPrefix(prefix: string)
```js
krm.setPrefix('/');

krm.add('ping', (msg, reply) => {
    reply.text('pong!');
});
```
 - 자동으로 앞에 해당 prefix를 넣는
 - 중복으로 넣지 않게 조심하심시오