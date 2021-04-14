//                                                  오래된 var
// var는 초기 자바스크립트 구현 방식 때문에 let과 const로 선언한 변수와는 다른 방식으로 동작한다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                          var는 블록 스코프가 없다.
// var로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프이다. 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근 가능하다.
if (true) {
    var test = true;
}
alert(test); // test if문안의 변수에 접근가능
// var는 코드 블록을 무시하기 때문에 test는 전역 변수가 된다.

// 코드 블록이 함수 안에 있다면, var는 함수 레벨 변수가 된다.
function sayHi() {
    if (true) {
    var phrase = "Hello"
    }
    alert(phrase); // 제대로 출력된다.
}
sayHi();
alert(phrase); // Error: phrase is not defined

//                                                  var는 재선언을 허용한다.
// 같은이름의 변수를 let으로 두번 선언하면 에러가나낟.
let user;
let user; // SynxtaxError: 'user' has already been declared
// var는 여러번 재선언해도 오류가나지 않는다.
var user = "Pete";
var user = "John";
alert(user); // John

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                     선언하기 전 사용할 수 있는 var
// var 선언은 함수가 시작될 때 처리된다. 전역에서 선언한 변수라면 스크립트가 시작될 때 처리된다.
// 함수 본문 내에서 var로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의된다.
function sayHi() {
    phrase = "Hello";
    alert(phrase);
    var phrase;
}
sayHi();
// 위 함수는 아래 함수와 동일하게 동작한다.
function sayHi() {
    var phrase;
    phrase = "Hello";
    alert(phrase);
}
sayHi();

// 이렇게 변수가 끌어올려 지는 현상을 호이스팅(hoisting)이라고 한다. 
function sayHi() {
    phrase= "Hello";
    if (false) {
        var phrase;
    }
    alert(phrase);
}
sayHi(); // Hello
// var는 함수가 선언될 때 처리되고 블록을 무시하기 때문에 if문의 조건이 만족되지 못해 조건문의 내용을 읽지 못해도 var는 선언된다.

// 선언은 호이스팅 되지만 할당은 호이스팅 되지 않는다.
function sayHi() {
    alert(phrase); // undefined
    var phrase = "Hello"
}
sayHi();
// var phrase = "Hello" 행에선 두 가지 일이 일어난다.
// 1. 변수 선언
// 2. 변수에 값을 할당
// 변수 선언은 함수 실행시 처리되었고(호이스팅) 할당은 호이스팅 되지 않기 때문에 할당 관련 코드에서 처리된다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
