//                                                     객체로서의 함수와 기명 함수 표현식
// 자바스크립트에서 함수는 값으로 취급되고 모든 값은 자료형을 가지고 있다. 함수의 자료형은 객체이다.
// 함수는 호출이 가능한(callable) 행동객체이다. 함수는 객체처럼 함수에 프로퍼티를 추가.제거하거나 참조를 통해 전달할 수도 있다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      name 프로퍼티
// 함수 객체엔 몇 가지 쓸만한 프로퍼티가 있다. name 프로퍼티를 사용하면 함수 이름을 가져올 수 있다.
function sayHi() {
    alert("Hi");
}
alert(sayHi.name); // sayHi

let sayHi = function() {
    alert("Hi")
}
alert(sayHi.name); // sayHi, 익명 함수지만 이름이 있다.
// 이 기능을 contextual name 이라고 부른다. 이름이 없는 함수의 이름을 지정할 땐 컨텍스트에서 이름을 가져온다.

// 객체 안에 있는 메서드도 name을 통해 이름을 가져올 수 있다.
let user = {
    sayHi() {

    },
    sayBye: function() {

    }
}
alert(user.sayHi.name); // sayHi
alert(user.sayBy.name); // sayBye

// 객체 메서드 이름은 함수처럼 자동 할당 되지 않는다. 적절한 추론이 안되는 상황이 있는데 이때 name프로퍼티엔 빈 문자열이 저장된다.
let arr = [function() {}]; // 배열에 함수가 들어감.
alert(( arr[0].name) ); // 빈문자열, 배열의 key는 1,2,3 이기 때문에 적절한 이름을 추론할 수 없다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          length 프로퍼티
// length는 함수 매개변수의 개수를 반환한다.
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length) // 1
alert(f2.length) // 2
alert(many.length) // 2, 나머지 매개변수는 포함되지 않음

// length 프로퍼티는 다른 함수 안에서 동작하는 함수의 타입을 검사(type introspection)할 때도 종종 사용된다.
// 질문에 쓰일 question과 질문에 대한 답에 따라 호출할 임의의 수의 handler 함수를 함께 받는 함수 ask를 예시로 이에 대해 알아보자.
function ask(question, ...handlers) {   // 2번째 매개변수를 나머지 매개변수 배열에 담음
    let isYes = confirm(question); // 질문을 보여주고 true 혹은 false를 반환하는 함수

    for (let handler of handlers) { // 나머지 매개변수의 요소를 순환함
        if (handler.length == 0) { // 메서드의 매개변수가 0개면 다음 조건문 실행 매개변수의 갯수에 따라 다른 함수를 호출하게 하는 방식
            if (isYes) handler(); // 또한 confirm에서 ok를 눌러 true를 반환 할 시 해당 handler()를 호출한다.
        } else {
            handler(isYes); // 매개변수가 0개가 아니면 다음 handler를 호출함.
        }
    }
}
// 인수의 종류에 따라 인수를 다르게 처리하는 방식을 프로그래밍 언어에선 다형성(polymorphism)이라고 부른다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                        커스텀 프로퍼티
// 함수 자체적으로 프로퍼티를 추가해 줄 수도 있다.
function sayHi() {
    alert("Hi");

    sayHi.counter++; // 함수를 호출 할 때 마다 sayHi함수의 counter 프로퍼티의 값을 1추가한다.
}
sayHi.counter = 0; // 초깃값

sayHi();
sayHi();
alert( `호출 횟수: ${sayHi.counter}회` ); // 호출 횟수: 2회

// (!) 프로퍼티는 변수가 아니다.
//     sayHi.counter는 let counter와 전혀 관계가 없다.

// 클로저는 함수 프로퍼티로 대체할 수 있다.
function makeCounter() {
    
    function counter() {
        return counter.count++; // 기존에 let count = 0; 으로 변수를 선언하는 것 대신 프로퍼티를 사용해 값을 추가한다.
    };
    counter.count = 0; // 초깃값 설정
    return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1

// 변수 선언과 프로퍼티사용의 차이는 count값이 외부 변수에 저장되어 있는 경우 드러난다.
// 클로저를 사용한 경우 외부 코드에서 count에 접근할 수 없다. 오직 중첩함수 내에서만 count값을 수정할 수 있다.
// 반면, 함수 프로퍼티를 사용해 count를 함수를 바인딩시킨 경우엔 외부에서 값을 수정할 수 있다.
function makeCounter() {
    
    function counter() {
        return counter.count++; // 기존에 let count = 0; 으로 변수를 선언하는 것 대신 프로퍼티를 사용해 값을 추가한다.
    };
    counter.count = 0; // 초깃값 설정
    return counter;
}

let counter = makeCounter();
counter.count = 10; // 외부에서 count값을 수정할 수 있다. 코드 블록안에 있는 변수를 밖으로 꺼낼 수 없기 때문에 변수 선언과는 차이가 있음
alert( counter() ); // 10

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          기명 함수 표현식 (Named Function Expression, NFE)
// 기명 함수 표현식은 이름이 있는 함수 표현식을 나타내는 용어다.
let sayHi = function(who) {
    alert( `Hello ${who}` ); // 일반 함수 표현식
};

let sayHi = function func(who) {
    alert( `Hello ${who}` ); // 기명 함수 표현식
};

// 이렇게 함수에 이름을 붙여도 위 함수는 여전히 '함수 표현식'이라는 점에 주목해야한다. 여전히 표현식을 변수에 할당한 형태이다.
// sayHi()로 호출도 가능해 기존 함수 표현식의 동작이 변화되는 것은 없다.
// 대신 두 가지 변화가 생기는데,
// 1. 이름을 사용해 함수 표현식 내부에서 자기 자신을 참조할 수 있다.
// 2. 기명 함수 표현식 외부에선 그 이름을 사용할 수 없다.
let sayHi = function func(who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        func("Guest") // func를 사용해 자신을 호출한다.
    }
};
sayHi(); // Hello, Guest
func(); // Error, func is not defined, 기명 함수 표현식은 외부에서 그이름에 접근 불가능

// 하지만 대부분은 이렇게 동작하는 함수를 작성할 텐데,
let sayHi = function func(who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        sayHi("Guest");
    }
};
// 만약 자기 자신을 호출할 때 할당 변수 sayHi가 외부 코드에서 수정될 경우 자기자신을 호출할 수 없기 때문에 자기 자신만 사용 가능한 고유한 이름을 붙여
// 줘 자기자신을 호출할 수 있다.
// 위 에러는 함수가 sayHi를 외부 렉시컬 환경에서 가지고 오기 때문에 발생한다. 해당 함수의 렉시컬 환경엔 sayHi가 없기 때문에 외부에서 sayHi를 가져오고
// sayHi가 변경되면 변경된 값이 저장되어있을 수 있기 때문에 에러가 발생




function makeCounter() {
    
}