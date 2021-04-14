//                                                      화살표 함수(arrow function) 기본
// 함수를 좀더 단순하고 간결하게 만드는 문법

// 문법
let func = (arg1, arg2, argN) => expression;
// 인자 arg1 ~ argN을 받는 함수 func가 만들어진다. 함수는 화살표 => 우측의 표현식을 평가하고 평가 결과를 반환한다.

// 위 화살표 함수는 아래 함수의 축약 버전이라고 보면된다.
let func = function(arg1, arg2, argN) {
    return expression;
};

// 아래 예시와 같이 함수를 동적으로 만들 수 있다.
let age = prompt("나이를 알려주세요.", 18);
let welcome = (age < 18) ?
    () => alert('Hi') :
    () => alert('Hello');
welcome();

// 본문이 여러 줄인 화살표 함수
// 평가해야 할 표현식이나 구문이 여러 줄인 함수는 중괄호 안에 평가해야할 코드를 넣고 return지시자를 사용해 명시적으로 결갓값을 반환해 주어야한다.
let sum = (a, b) => {   // 중괄호는 본문 여러 줄로 구성되어 있음을 알려준다.
    let result = a + b;
    return result;      // 중괄호를 사용했다면, return지시자로 결괏값을 명시해줘야함
}
alert( sum(1, 2) ); // 3