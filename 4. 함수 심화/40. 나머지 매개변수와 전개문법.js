//                                                      나머지 매개변수와 전개 문법
// 상당수의 자바스크립트 내장 함수는 인수의 개수에 제약을 두지 않는다. 즉, 매개변수와 인수의 시그니쳐를 맞출 필요가 없다.
// 이번 챕터에서는 임의의 수의 인수를 처리하는 방법에 대해 배운다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  나머지 매개변수 ...
// 함수 정의 방법과 상관없이 함수에 넘겨주는 인수의 개수엔 제약이 없다.
function sum(a, b) {
    return a + b;
}
alert(sum(1, 2, 3, 4, 5)) // 3, 매개변수는 2개로 정했지만 보내는 인수엔 제약이 없음 앞 두개의 인수만 전달될 뿐이다.

// 이러한 여분의 매개변수를 배열에 담아 저장할 수 있다. 마지막 매개변수에 ...배열명 을 적어주면 나머지 매개변수들을 한데 모아 배열에 넣어라 라는 뜻이다.
function sumAll(...args) {
    let sum = 0;
    for (let arg of args) {
        sum += arg;
    }
    return sum;
}
alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ) // 3

// 변수에 담고싶은 것은 매개변수에 배열에 담고싶은 것은 배열에 담을 수도 있다.
function showName(firstName, lastName, ...title) {
    alert(firstName + ' ' + lastName); // Julius Caesar
    alert( title[0] + ' ' + title[1]); // Consul Imperator
    title.length // 2
}
showName("Julius", "Caesar", "Consul", "Imperator");

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      arguments 변수
// arguments라는 특별한 유사 배열 객체를 이용하면 인덱스를 사용해 인수에 접근할 수 있다.
function showName() {
    alert( arguments.length );
    alert( arguments[0] ); // 첫 번째 매개변수
    alert( arguments[1] ); // 두 번째 매개변수
}
showName("Julius", "Caesar") // 2, Julius, Caesar 가 순서대로 출력된다.
shouwName("Bora") // 1, Bora, undefined 가 순서대로 출력된다. 함수엔 두 번째 매개변수를 출력하도록 되어있지만 순서에 맞는 매개변수가 없을시 undefined를 출력함.
// arguments는 옛날 ... 보다 옛날 문법이기 때문에 요즘 주로 사용하지는 않음
// arguments는 유사 배열객체이기 때문에 유용한 배열의 메서드를 사용할 수 없음

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      spread 문법
// 지금 까지는 매개변수 목록을 배열로 가져왔지만 반대로 배열을 전개해 매개변수로 받는 방법도 있다.
// 예를 들어 Mat.max()는 인수중 가장 큰 숫자를 반환하는 메서드이다. (인수가 반드시 숫자여야함)
alert( MAt.max(3, 5, 1) ); // 5
// 배열 [3, 5, 1] 이 있고 이를 매개변수로 보내고 싶다면
let arr = [3, 5, 1];
alert( Math.max(arr) ); // NaN, 오류가 난다 Math.max의 인수는 반드시 숫자여야 하기 때문이다.
// 배열의 프로퍼티들을 전개해서 매개변수로 전달해야하는데, 나머지 매개변수와 형태는 같은 ...배열명 을 사용한다.
// 나머지 매개변수는 인수를 받아 배열을 새로만들어 배열명을 짓는 반면 spread문법은 원래 있는 배열을 전개하는 점이 다르다.
let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5, 정상 작동함

// 이터러블 객체 여러개를 전달할 수도 있다.
let arr1 = [1, -2, 3];
let arr2 = [8, 3, -8];
alert( Math.max(...arr1, ...arr2) ); // 8

// 평범한 값과 혼합해 사용도 가능
alert(Math.max(0, ...arr1, 22, ...arr2) ); // 22

// 배열을 합칠 수도 있다.
let merged = [0, ...arr1, 2, ...arr2]; // 0, 1, -2, 3, 2, 8, 3, -8 순으로 저장된다.

// 이터러블 객체도 전달 가능
let str = "Hello";
alert( [...str] ); // H,e,l,l,o
// 전개 문법은 for...of와 같은 방식으로 내부에서 반복자(iterator)를 사용해 요소를 수집하기 때문이다.
// Array.from(obj)와 동일하게 동작하지만 Aray.from은 이터러블객체 뿐만 아니라 유사 배열 개체에도 적용 가능해 더 광범위하게 사용가능하다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                   배열/객체 복사
// Object.asign() 메서드로 객체를 복사 할당할 수도 있지만, spread 문법으로도 같은 동작을 할 수 있다.
let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread 배열을 전개해 매개변수의 리스트로 만들고 전개된 값들을 다시 배열에 넣음
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true, 객체의 형태는 같음
alert(arr === arrCopy); // false, 같은 참조는 아님
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3  같은 참조아님

// 배열 뿐만아니라 객체도 같은 동작이 가능함
// 위 문법이 asign() 메서드보다 짧기 때문에 대게는 spread문법을 선호함