//                                                          변수의 유효 범위와 클로저
// 함수 내부에서 함수 외부에 있는 변수에 접근할 수 있다. 그런데 함수가 생성된 이후에 외부 변수가 변경되면 어떤 일이 발생할까? 새로운 값? 아니면 이전의 값?
// 혹은 매개변수를 통해 함수를 넘기고 이 함수를 저 멀리 떨어진 코드에서 호출할 땐 어떤 일이 발생할까요? 함수는 호출 되는 곳을 기준으로 외부 변수에 접근할까?

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          코드블록
// 코드 블록 {...} 안에서 선언한 변수는 블록 안에서만 사용할 수 있다.
{
    let message = "hello" // 블록 내에서만 변숫값을 얻을 수 있다.

    alert(message); // hello
}

alert(message); // ReferenceError: massage is not defined

// 이러한 특징은 고유한 작업을 수행하는 코드를 한데 묶는 용도로 활용 한다. 이 블록 안엔 어떤 목적을 위한 변수만 들어가게끔...
// 예를 들어
{ // 맞이 인사를 위한블록
    let message = "안녕하세요";
    alert(message);
}

{ // 배웅 인사를 위한 블록
    let message = "안녕히 가세요";
    alert(message);
    // 변수이름이 같더라도 다른 참조를함
}
// (I) 블록이 없으면 에러가 발생할 수 있다.
//  이미 선언된 변수와 동일한 이름을 가진 변수를 별도의 블록 없이 let으로 선언하면 에러가 발생한다.

// if, for, while 등에서도 마찬가지로 코드 블록 안에서 선언한 변수는 오직 블록 안에서만 접근 가능하다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                      중첩 함수
// 함수 내부에 선언한 함수를 중첩(nested)함수라고 부른다. 중첩 함수는 아래와 같이 코드를 정돈하는데 사용할 수 있다.
function sayHiBye(firstName, lastName) {
    function getFullName() {
        return firstName + " " + lastName; // 이름 전체를 반환해주는 중첩함수 getFullName()은 편의상 만든 함수 여러번 호출 될 수 있기 때문
    }
    alert( "Hello, " + getFullName() );
    alert( "Bye, " + getFullName() );
}

// 중첩 함수는 반환될 수 있다는 점에서 흥미롭다. 새로운 객체의 프로퍼티 형태로나 중첩 함수 그 자체로 반환 된다. 이렇게 반환된 함수는 어디서든 호출해 사용
// 할 수 있다. 물론 이때도 외부 변수에 접근할 수 있다는 사실은 변함없다.
function makeCounter() {
    let count = 0;
    return function() { // 익명 함수를 반환함
        return count++;
    }
}
let counter = makeCounter(); // 반환한 익명 함수를 counter변수에 할당함.

alert( counter() ); // 0, count++ 이기 때문에 반환하고 값을 더한다.
// 코드 블록 안에 있지만 counter기준 외부에 있는 변수 count에 접근할 수 있다.
alert( counter() ); // 1
alert( counter() ); // 2
// 그런데 makeCounter를 살펴보다 보면 counter를 여러 개 만들었을 때, 이 함수들은 서로 독립적일까? 함수와 중첩 함수 내 count 변수엔 어떤 값이 할당 될까?
// 예를 들어 counter1을 호출 했을 때 counter2의 count는 올라갈까?

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          렉시컬 환경
// 단계1. 변수
// 자바스크립트에선 실행 중인 함수, 코드 블록, 스크립트 전체는 렉시컬 환경(Lexical Environment)이라 불리는 
// 내부 숨김 연관 객체(Internal hidden associated object)를 갖고 있다.
// 내부 숨김 연관 객체는 두 부분으로 구성된다.
// 1. 환경 레코드(Envrionment Record): 모든 지역 변수를 프로퍼티로 저장하고 있는 객체이다. this값과 같은 기타 정보도 여기 저장.
// 2. 외부 렉시컬 환경(Outer Lexical Envrionment)에 대한 참조: 외부 코드와 연관됨

// !! 변수는 특수 내부 객체인 환경 레코드의 프로퍼티 일 뿐이다. 변수를 가져오거나 변경 하는 것은 환경레코드의 프로퍼티를 가져오거나 변경 하는것!!
let phrase = "Hello"; // 렉시컬 환경, 내부 숨김 연관 객체, 환경 레코드 안에 key가 phrase이고 value가 "Hello"인 프로퍼티가 추가된 것
alert(phrease); 
// 이렇게 스크립트 전체와 관련된 렉시컬 환경은 전역 렉시컬 환경(global Lexical Environment)이라고 한다.
// 전역 렉시컬 환경은 외부 참조를 갖지 않기 때문에 화살표가 null을 가리킨다.

// 코드가 실행되고 실행 흐름이 이어져 나가면서 렉시컬 환경은 변화한다.
//execution Start   // phrase: <uninitialized> --> 외부참조: null
let phrase;         // phrase: undefined
phrase = "Hello";   // phrase: "Hello"
phrase = "Bye";     // phrase: "Bye"
// 1. 스크립트가 시작되면 스크립트 내에서 선언한 변수 전체가 렉시컬 환경에 올라간다.(pre-popularted).
//  ● 이때 변수의 상태는 특수 내부 상태(special internal state)인 uninitialized가 된다. 자바스크립트 엔진은 uninitilized상태의 변수를 인지하긴 하지만
//    let을 만나기 전까진 이 변수를 참조할 수 없다.
// 2. let phrase가 나타나면, 아직 값을 할당하기 전이기 때문에 프로퍼티 값은 undefined이다. 이 때부터 phrase는 사용 가능
// 3. phrase에 값이 할당
// 4. phrase의 값이 변경

// 단계 2. 함수 선언문
// 함수는 변수와 마찬가지로 값이다.
// 다만, 함수 선언문(function declaration)으로 선언한 함수는 일반 변수와는 달리 바로 초기화된다는 점에서 차이가 있다.
// 함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있다. 변수는 let을 만나 선언이 될 때까지 사용할 수 없는 것과 반대로
// 함수 선언문으로 선언한 함수를 선언되기 전에도 함수를 사용할 수 있는 것은 바로 이 때문이다.
// excution start   // phrase: <uninitialized> say: function --> 외부참조: null , phrase는 uninitialized상태지만 함수 say는 값이 할당된다. -바로사용
let phrase = "Hello"; // phrase: "Hello"
function say(name) {
    alert( `${phrase}, ${name}` );
}
// 이러한 동작 방식은 함수 선언문으로 정의한 함수에만 적용 let say = function(name) ... 함수 표현식에는 사용x

//--------------------------------------------------------------------------------------------------------------------------------------------------
// 단계 3. 내부와 외부 렉시컬 환경
// 함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어진다. 이 렉시컬 환경엔 함수 호출시 넘겨받은 매개변수와 함수의 지역 변수가 저장된다.
let phrase = "Hello";
function say(name) {
    alert( `${phrase}, ${name}` ); // 호출 렉시컬 환경 name: "John" --> 전역 렉시컬 환경 say: function, phrase: "Hello" --> null
// 호출 렉시컬 환경이 새로 생기고 name: "John" 프로퍼티가 만들어지고 이 호출 렉시컬 환경은 전역 렉시컬 환경을 참조한다.
}

say("John"); // Hello, John
// 함수가 호출 중인 동안은 호출 중인 함수를 위한 내부 렉시컬 환경과 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경 두 개를 갖게 된다.
// ● 위 예시의 내부 렉시컬 환경은 '현재' 실행 중인 함수 say에만 상응한다. 그렇기 때문에 name으로부터 유래한 프로퍼티만 존재하며 호출시 John을 인수로
//  보냈기 때문에 name의 값은 John이 된다.
// ● 위 함수의 외부 렉시컬 환경은 전역 렉시컬 환경이다. 그리고 내부 렉시컬 환경은 외부 렉시컬 환경에 대한 참조를 갖는다.

// 코드에서 변수에 접근할 때, 먼저 내부 렉시컬 환경을 검색 범위로 잡는다. 즉 매개변수 먼저 탐색하고 없으면 전역 변수를 탐색 찾을 때 까지 이 과정 반복
// 엄격모드에선 변수를 찾지 못하면 에러가 발생한다. 비엄격 모드에선 변수를 찾지 못하면 새로운 전역변수가 만들어짐

// 단계 4. 반환 함수
function makeCounter() {
    let count = 0;
    return function() {
        return count++; // 호출 렉시컬 환경 count: 0 --> 전역 렉시컬 환경 makeCounter: function, counter: undefined --> null
    };
}
let counter = makeCounter();
// makeCounter를 호출 할 때 호출 렉시컬 환경이 새로 만들어지고 count: 0 프로퍼티가 만들어지고 전역 렉시컬 환경을 참조한다.
// 하지만 makeCounter()가 실행되는 도중에 한 줄짜리 본문 return count++을 가진 중첩 함수가 만들어진다.(생성만되고 실행은 안된상태)
// 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다. 즉, 생성된 곳을 참조한다.
// 함수는 [[Environment]]라는 숨김 프로퍼티에 함수가 생성된 곳의 환경에 대한 참조가 저장된다.
function makeCounter() {
    let count = 0;
    return function() { // [[Environment]] --> count: 0 --> makeCounter: function, counter: undefined --> null
        return count++;
    };
}

let counter = makeCounter(); 
// 호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 바로 [[Environment]] 프로퍼티 덕이다.
// [[Environment]]는 함수가 생성될 때 딱 한 번 그 값이 세팅된다. 그리고 이 값은 영원히 변하지 않는다.

// counter()를 호출하면 각 호출마다 새로운 렉시컬 환경이 만들어진다. 그리고 이때 Envrionment에 저장된 렉시컬 환경을 외부 렉시컬 환경으로서 참조하게 된다.
function makeCounter() {
    let count = 0;
    return function() {     // counter 렉시컬환경 <empty> --> makeCounter 렉시컬 환경 count: 0 --> 전역 렉시컬 환경 makeCounter: function, counter: function --> null        
        return count++;
    };
}
let counter = makeCounter();
alert( counter() ); // 0, count++이기 때문에 0이 출력되고 makeCounter 렉시컬 환경에서 0이 1로 수정된다.
// 실행 흐름이 중첩 함수의 본문으로 넘어오면 count변수가 필요한데, 자기 자신에서 변수를 찾는다. 하지만 지역변수, 매개변수가 없는 counter함수는 <empty> 상태
// 그리고 외부 렉시컬 환경에서 찾아보고 찾을 때 까지 이 과정 반복
// 변숫값 갱신은 변수가 저장된 렉시컬 환경에서 이루어진다.

// (I) 클로저
//  클로저(closure)는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미한다.
//  다른 언어는 클로저를 구현하는 게 불가능하거나 어려운데, 자바스크립트는 모든 함수가 자연스럽게 클로저가 된다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                  가비지 컬렉션
// 함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거된다. 함수와 관련된 변수들도 이때 모두 사라진다.
// 함수 호출이 끝나면 해당 변수를 참조할 수 없는 이유가 바로 이것이다.
// 그런데 호출이 끝난 후에도 여전히 도달 가능한 중첩 함수가 있을 수 있다. 이때는 이 중첩함수의 [[Environment]]에 외부 함수 렉시컬 환경에 대한 정보가 저장된다.
// 함수 호출은 끝났지만 렉시컬 환경이 메모리에 유지되는 이유는 바로 이 때문이다.
function f() {
    let value = 123;
    return function() {
        alert(value);
    }
}
let g = f(); // g.[[Environment]]에 f() 호출 시 만들어지는 렉시컬 환경 정보가 저장된다.

// 그런데 f()를 여러 번 호출하고 그 결과를 어딘가에 저장하는 경우 호출 시 만들어지는 각 렉시컬 환경 모두가 메모리에 유지된다.
function f() {
    let value = Math.random();
    return function() { alert(value); };
}
let arr = [f(), f(), f()]; // 함수를 3번 호출하고 배열에 저장하면 3개의 각각 렉시컬환경이 따로 만들어지고 메모리에 삭제되지 않는다.

let arr = null; // 처럼 중첩 함수가 메모리에서 삭제되고 난 후에야 이를 감싸는 렉시컬 환경도 메모리에서 제거된다.

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          최적화 프로세스
// 함수가 살아 있다면 이론상으론 모든 외부 변수 역시 메모리에 유지된다.
// 그러나 실제로는 자바스크립트엔진이 이를 지속해서 최적화한다. 변수 사용을 분석하고 사용 되지않는 외부 변수를 메모리에서 지운다.