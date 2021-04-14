//                                                              함수 바인딩
// setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 this정보가 사라지는 문제가 생긴다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              사라진 this
// 객체 메서드가 객체 내부가 아닌 다른 곳에 전달되어 호출되면 this가 사라진다.

let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};
setTimeout(user.sayHi, 1000); // Hello, undefined!, setTimeout에 객체에서 분리된 함수인 user.sayHi의 컨텍스트가 전달되기 때문

let f = user.sayHi;
setTimeout(f, 1000); // 위 마지막줄과 이 코드는 동작방식이 같음

// 브라우저 환경에서 stTimeout메서드는 조금 특별한 방식으로 동작한다. 인수로 전달받은 함수를 호출할 때, this에 wnidow를 할당한다.
// 따라서 위 예시의 this.firstName은 window.firstName가 되는데 window객체엔 firstName이 없으므로 undefiend가 된다.

// 위 예시처럼 객체 메서드를 실제 메서드가 호출되는 곳으로 전달하는 일은 아주 흔하다. 이렇게 메서드를 전달할 때, 컨텍스트도 제대로 유지하려면 어떻게 해야할까

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      방법 1: 래퍼
setTimeout(function() {
    user.sayHi(); // Hello, John!
}, 1000);
// 위 예시가 제대로 동작하는 이유는 sayHi()를 호출하기 위해 외부 렉시컬환경(여기선 전역 렉시컬환경)에서 user에 접근했기 때문이다.
// 메서드의 컨텍스트를 복사하는 것이 아닌 메서드를 직접 호출해 해당 메서드를 동작시키는 함수(래퍼)를 인수로 보낸 것

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      방법 2: bind
// 모든 함수는 this를 수정하게 해주는 내장 메서드 bind를 제공한다.
let boundFunc = func.bind(context);
// bind는 함수처럼 호출 가능한 특수 객체를 반환한다. 이 객체를 호출하면 this가 context로 고정된 함수 func가 반환된다.
// context를 this로 고정하는 함수를 반환한다는 뜻

let user = {
    firstName: "John"
};
function func() {
    alert(this.firstName);
}
let funcUser = func.bind(user);
funcUser(); // John

// 객체 메서드에 bind 적용 예시
let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);

sayHi(); // Hello, John!

setTimeout(sayHi, 100); // Hello, John!

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                  부분 적용
// bind는 this뿐만 아니라 인수도 바인딩이 가능하다. 인수 바인딩은 잘 쓰이진 않지만 가끔 유용할 때가 있다.
let bound = func.bind(context, [arg1], [arg2,]);
// bind는 컨텍스트를 this로 고정하는 것 뿐만 아니라 함수의 인수도 고정해준다.

function mul(a, b) { // 곱셈을 해주는 함수 mul()
    return a * b;   
}

let double = mul.bind(null, 2); // 인수를 2로 고정해 2배를 해주는 함수 double로 만듬

double(3); // 6
double(4); // 8

// mul.bind(null, 2)를 호출하면 새로운 함수 double이 만들어진다. double엔 컨텍스트가 null, 첫 번째 인수는 2인 mul의 호출 결과가 전달된다.
// 이런 방식을 부분 적용(partial application)이라고 부른다. 부분 적용을 사용하면 기존 함수의 매개변수를 고정하여 새로운 함수를 만들 수 있다.
// * 위 예시에선 this를 사용하지 않았다. bind엔 컨텍스트를 항상 넘겨줘야 하므로 null을 사용했다

// 그런데 부분 함수는 왜 만드는 걸까요?
// 가독성이 좋은 이름을 가진 독립 함수를 만들 수 있다는 이점 때문이다. 게다가 인수를 고정하면 매번 인수를 전달할 필요도 없어진다.
// 이 외에도 매우 포괄적인 함수를 기반으로 덜 포괄적인 변형 함수를 만들 수 있따는 점에서 유용하다.
// 예를 들어, 함수 send(from, to, text)가 있다고 가정해 봅시다. 객체 user안에서 부분 적용을 활용하면, 전송 주체가 현재 사용자로 고정된 함수
// sendTo(to, text)를 구현할 수 있다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                컨텍스트 없는 부분 적용
// 인수 일부는 고정하고 컨텍스트 this는 고정하고 싶지 않다면 어떻게 해야 할까요?
// 기존의 bind로는 컨텍스트를 생략할 수 없다. 그렇기 때문에 인수만 바인딩해주는 헬퍼 함수 partial을 직접 커스텀해야 한다.
function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args); // 컨텍스트는 this로 동적으로 만들고 인수는 partial과 래퍼에서 받아온 인수로 고정시킨다.
    }
}

let user = {
    firstName: "John",
    say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes()); // time을 나타내는 인수를 고정해서 래퍼함수를 만든다.

user.sayNow("Hello"); // [10:00] John: Hello!, // phrase를 받는 래퍼함수에 인수로 문자열 Hello를 보낸다.

// (I) bind 두번 적용하기
// 함수에 bind를 적용하고, 이어서 한 번 더 bind를 적용하면 this를 바꿀 수 있을까요?
function f() {
    alert(this.name);
}
f = f.bind( {name: "John"} ).bind( {name: "Ann"} );

f(); // John
// f.bind(...)가 반환한 특수 객체인 묶인 함수는 함수 생성 시점의 컨텍스트만 기억한다. 인수가 제공되었다면 그 인수 또한 기억한다.
// 즉 한 번 bind를 적용하면 bind를 사용해 컨텍스트를 다시 정의할 수 없다.

// (I) bind를 적용한 함수의 프로퍼티
// 함수 프로퍼티에 값을 하나 할당해보자. 이 함수에 bind메서드를 적용하면 프로퍼티 값은 바뀔까?
function sayHi() {
    alert(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
    name: "John"
});

alert(bound.test); // undefined
// bind를 적용하면 또 다른 객체가 반환된다. 새로운 객체엔 test프로퍼티가 없으므로 undefined가 출력된다.