//                                                       JSON과 메서드
// 복잡한 객체를 다루고 있다고 가정해 보자. 네트워크를 통해 객체를 어딘가에 보내거나 로깅 목적으로 객체를 출력해야 한다면 객체를 문자열로 전환해야 할 것이다.
// 왜냐하면 자료구조로서 객체가 아닌 형태로서 문자열의 객체가 필요하기 때문

// 이때 전환된 문자열엔 원하는 정보가 있는 객체 프로퍼티 모두가 포함되어야 한다.
// 왜냐하면 프로퍼티 누락이 발생하면 곤란하니까~

let user = {
    name: "John",
    age: 30,

    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
};

alert(user); // {name: "John", age: 30}, toString() 메서드를 구현해 문자열로 바꾼 경우!
// 그런데 개발 과정에서 프로퍼티가 추가되거나 삭제, 수정될 경우 위 toString을 매번 수정해야 하기 때문에 유지보수가 어렵다.
// JSON은 이런 문제를 해결해주는 방법이다.

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          JSON.stringify()
// JSON(Javascript Object Notation)은 값이나 객체를 나타내주는 범용 포맷이다.
// JSON은 본래 자바스크립트에서 사용할 목적으로 만들어진 포맷이다. 그런데 라이브러리를 사용하면 자바스크립트가 아닌 언어에서도 JSON을 충분히 다룰 수 있다.
// 예를 들어 서로 다른 언어를 사용하는 서버(리눅스)와 클라이언트측(자바스크립트)사이의 정보 교환을 위해 사용할 수 있음
// * JSON.stringify() - 객체를 JSON으로 바꿔줌
// * JSON.parse() - JSON을 객체로 바꿔줌

let student = {
    name: 'John',
    age: 30,
    isAdming: false,
    courses: ['html', 'css', 'js'],
    wife: null
};

let json = JSON.stringify(student);
alert(typeof json); // string
alert(json);/* {
                    "name": "John",
                    "age": 30,
                    "isAdmin": false,
                    "courses": ["html", "css", "js"],
                    "wife": null
                }
            */
// 객체 student를 문자열로 바꿈
// 이렇게 변경된 문자열은 JSON으로 인코딩된(JSON-encoded), 직렬화 처리된(serialized), 문자열로 변환된(stringified), 결집된(marshalled)객체라고 부른다.
// 객체는 문자열로 변환된 후에야 비로소 네트워크를 통해 전송되거나 저장소에 저장할 수 있다.

// JSON으로 인코딩된 객체는 일반 객체와 다른 특징이 있다.
// * 문자열은 큰따옴표로 감싸야 한다. 작은따옴표 혹은 백틱 사용 불가 ('John' -> "John")
// * 객체 프로퍼티 이름은 큰따옴표로 감싸야 한다. (age: 30 -> "age": 30)

// JSON.stringify가 적용되는 자료형. 객체뿐만 아니라 원시값도 적용 가능.
// 객체 {...}, 배열[...], 문자형, 숫자형, 불린형, null

// JSON은 데이터 교환을 목적으로 만들어져 특정 언어에 종속되지 않아 자바스크립트 특유의 객체 프로퍼티는 처리 불가능하다.
// 호출시 무시되는 프로퍼티 목록
// * 함수 프로퍼티(메서드), 심볼형 프로퍼티, 값이 undefined인 프로퍼티

// JSON.stringify를 사용할 때 주의해야할 점이 있다. 순환 참조가 있으면 원하는 대로 객체를 문자열로 바꾸는 게 불가능하다.
let room = {
    number: 23
};
let meetup = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup.place = room;        // meetup은 room을 참조하고
room.occupiedBy = meetup;   // room은 meetup을 참조한다. 순한참조 발생

JSON.stringify(meetup); // Error: Converting circular structure to JSON

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              replace로 원하는 프로퍼티만 직렬화하기
// JSON.stringify의 전체 문법을 사실 아래와 같다.
let json = JSON.stringify(value, replacer, space)
// value - 인코딩 하려는 값
// replacer - JSON으로 인코딩 하길 원하는 프로퍼티가 담긴 배열. 또는 매핑 함수
// space - 서식 변경 목적으로 사용할 공백 문자 수

// 대다수의 경우 첫 번째 인수만 넘겨 사용하지만, 순환 참조를 다뤄야 하는 경우 두번째 인수를 사용해 순환참조를 발생시키는 프로퍼티를 배제시킨 후 인코딩해야 한다.

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participantes: [{name: "John"}, {name: "Alice"}],
    place: room // meetup은 room을 참조한다.
};

room.occupiedBy = meetup; // room은 meetup을 참조한다.
alert(JSON.stringify(meetup), ['title', 'participants']); // {"title": "Conference", "participannts": [{},{}]}
// 순환참조가 발생하는 프로퍼티를 제외해 순환참조 객체를 출력할 수 있다.
// 그런데 배열에 name을 넣지 않아서 출력된 문자열의 participnats가 텅 비어버렸다. 규칙이 너무 까다로워 발생한 문제이다.

// 순환 참조를 발생시키는 프로퍼티 room.occupiedBy만 제외시키면 해결 가능
alert(JSON.stringify(meetup), ['title', 'participants', 'name', 'number', 'place']);
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// 위 예시와 같이 인수로 보내는 배열이 좀 길다면 배열 대신 함수를 전달해 이 문제를 해결할 수 있다. (매개변수 replace는 대체하다라는 뜻을 가짐)
// replacer에 전달되는 함수는 프로퍼티 (키, 값)쌍 전체를 대상으로 호출되는데, 반드시 기존 프로퍼티 값을 대신하여 사용할 값을 반환해야 한다.
// 특정 프로퍼티를 인코딩에서 누락시키려면 반환 값을 undefined로 만들면 된다.
alert(JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));
/* replacer 함수에서 처리하는 키:값 쌍 목록
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/

// replacer 함수가 중첩 객체와 배열의 요소까지 포함한 모든 키-값 쌍을 처리하고 있다는 점에 주목해야한다.
// replaecr 함수는 재귀적으로 키-값 쌍을 처리하는데, 함수 내에서 this는 현재 처리하고 있는 프로퍼티가 위치한 객체를 가리킨다.

// 첫 얼럿창에 ": [object Object]"는 함수가 최초로 호출될 때 {"": meetup}형태의 래퍼 객체가 만들어지기 때문이다.
// replacer가 가장 처음으로 처리해야하는 쌍은 래퍼 객체이다.

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              space로 가독성 높이기
// 세 번째 인수 space는 가독성을 높이기 위해 중간에 삽입해 줄 공백 문자 수를 나타낸다.
// space는 가독성을 높이기 위한 용도로 만들어졌기 때문에 단순 전달 목적이라면 space없이 직렬화 하는편이다.

// 아래 예시처럼 space에 2를 넘겨주면 자바스크립트는 중첩 객체를 별도의 줄에 출력해주고 공백 문자 두 개를 써 들여쓰기해 준다.
let user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};

alert(JSON.stringify(user, null, 2));
/* 공백 문자 두 개를 사용하여 들여쓰기함:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                    커스텀 toJSON
// toString을 사용해 객체를 문자형으로 변환시키는 것처럼, 객체에 toJSON이라는 메서드가 구현되어 있으면 객체를 JSON으로 바꿀 수 있다.
// JSON.stringify는 이런 경우를 감지하고 toJSON을 자동으로 호출한다.
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
};
alert(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
// Date객체의 내장 메서드 toJSON이 호출되면서 date의 값이 문자열로 변환된다. (1)
// 객체 room에는 toJSON이 없어 객체 그대로 출력된다. toJSON을 추가하면 아래 예시처럼 변경된다.

let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};
let meetup = {
    title: "Conference",
    room
};

alert(JSON.stringify(room)); //23
alert(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "room": 23
  }
*/
// 위와 같이 toJSON은 직접호출 할때도 사용되고, room과 같은 중첩객체에도 구현하여 사용할 수 있다.

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                   JSON.parse
// JSON으로 인코딩된 객체를 다시 객체로 디코딩 할 수 있다.
let value = JSON.parse(str, reviver); // reviver는 옵션
// str - JSON형식의 문자열
// reviver - 모든(key, value)쌍을 대상으로 호출되는 function(key, value)형태의 함수로 값을 변경시킬 수 있다.

let numbers = "[0, 1, 2, 3]"; // 문자열로 변환된 배열
numbers = JSON.parse(numbers);
alert(numbers[1]); // 1

// 아래와 같이 중첩 객체에도 사용 가능
let userData = '{"name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3]}';
let user = JSON.parse(userData);
alert(user.friends[1]); //1
// 중첩 객체나 중첩 배열이 있다면 JSON도 복잡해지기 마련인데 그럼에도 불구하고 JSON포맷을 꼭지켜야 한다.

// 파싱할 때 JSON포맷을 지키지 않아 주로 일어나느 실수들
let json = `{
    name: "John",                       // 실수 1: 프로퍼티 이름을 큰따옴표로 감싸지 않음
    "surname": 'smith',                 // 실수 2: 모든 문자열은 작은따옴표가 아닌 큰따옴표로 감쌈
    'isAdmin': false,                   // 실수 3: 모든 문자열은 작은따옴표가 아닌 큰따옴표로 감쌈
    "birthday": new Date(2000, 2, 3),   // 실수 4: new연산자를 사용할 수 없음 순수한 값만 사용가능
    "firiends": [0,1,2,3]   // 올바른 포맷
}`
// 추가로 JSON은 주석을 지원하지 않는다. 위 예시는 이해를 돕기위해 적은 주석 실제롤 안됌

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          reviver 사용하기
// 서버로부터 문자열로 변환된 meetup객체를 전송받았다고 가정했을 때
let str = '{"title": "Conference, "date": "2017-11-30-T12:00:00.000Z"}'; // 이런 식의 문자열일 것이다.
// 이제 이 문자열을 역 직렬화(deserialize)해서 자바스크립트 객체를 만들어보자.

let meetup = JSON.parse(str);
alert(meetup.date.getDate()); // 에러!!

// meetup.date의 값은 Date객체가 아니고 문자열이기 때문에 에러가 발생한다. 그렇다면 어떻게 문자열을 Date객체로 인식하게 할 수 있을까?
// reviver에 date프로퍼티는 Date객체를 반환하도록 동작하는 함수를 구현하면 가능하다.

let meetup = JSON.parse(str, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

alert(meetup.date.getDate()); // 정상작동

// 참고로 이 방식은 중첩 객체에도 적용할 수 있다.