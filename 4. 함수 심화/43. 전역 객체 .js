//                                                              전역 객체
// 전역 객체를 사용하면 어디서나 사용 가능한 변수나 함수를 만들 수 있다. 전역 객체는 언어 자체나 호스트 환경에 기본 내장되어 있는 경우가 많다.
// 브라우저 환경에선 전역 객체를 window, Node.js환경에선 global라고 부른다.
// 최근 전역객체 이름을 globalThis로 표준화하자는 말이있음.

// 전역 객체의 모든 프로퍼티는 아래와 같이 직접 접근할 수 있다.
alert("Hello");
window.alert("Hello") // 두 개는 서로 같다.

// 브라우저에서 let이나 const가 아닌 var로 선언한 전역 함수나 전역 변수는 전역 객체의 프로퍼티가 된다.
var gVar = 5;
alert(window.gVar); // 5 var로 선언한 변수는 전역객체의 프로퍼티가 된다.

// 위와 같이 var변수를 통해 전역 객체에 넣는 것은 좋은 방법이 아니다.
// 중요한 변수라서 모든 곳에서 사용할 수 있게 하려면, 아래와 같이 직접 전역객체에 프로퍼티를 추가해야한다.
window.currentUser = {
    name: "John"
};
alert(currentUnser.name); // John, 모든 스크립트에서 currentUser에 접근가능
alert(window.currentUser.name); // John 직접 호출도 가능
// 전역 변수는 되도록 사용하지 않는 것이 좋다. 함수를 만들 땐 외부 변수나 전역 변수를 사용하는 것보다 인풋 변수를 받고 이를 이용해 아웃풋을 만드는게 더 효율적이다.

