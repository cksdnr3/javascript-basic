//                                                      옵셔널 체이닝 '?.'
// 옵셔널 체이닝을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

//                                                      옵셔널 체이닝이 필요한 이유
// 예를 들어,
// 사용자가 여러 명 있는데 그 중 몇 명은 주소 정보를 가지고 있지 않다고 가정해보면, user.adress.street를 사용해 주소 정보에 접근하면 에러가 발생할 수 있다.
// 옵셔널 체이닝이 추가되기 전엔 이런 문제들을 해결하기 위해 &&연산자를 사용하곤 했다.
// 값이 존재하지 않으면(falsy이면) 에러를 발생시키지 않고 undefined를 반환하게 했다.
// 그런데 &&을 사용하면 코드가 너무 길어진다는 단점이 있어 옵셔널체이닝이 등장했다.

//----------------------------------------------------------------------------------------------------------------------------------------------
//                                                      옵셔널 체이닝의 등장
// '?.'은 '?.'앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다.

let user = {}; // 주소 정보가 없는 사용자 라고 가정
alert( user?.adress?.street ); // undefined, 에러 발생x undefined반환

// user.?adress로 주소를 읽으면 아래와 같이 user 객체가 존재하지 않더라도 에러가 발생하지 않는다.
let user = null;
alert( user?.adress ); // undefined
alert( user?.adress.street ); // undefined
// 위 예시를 통해 우리는 ?.은 ?. 앞 평가 대상에만 동작되고, 확장은 되지 않는다 라는 것을 알 수 있다. 

// (!) 옵셔널 체이닝을 남용하지 마라
// ?.는 존재하지 않아도 괜찮은 대상(옵셔널)에만 사용해야 한다.
// 위 예시에서 논리상 user는 반드시 있어야 하지만 adress는 필수값이 아니다. 그러니 user.adress?.street을 사용하는 것이 바람직 하다.
// 필수값인 user가 없으면 에러를 발생시켜 초기에 에러를 발견해 디버깅해줘야 하기 때문.

// (!) ?.앞의 변수는 꼭 선언되어 있어야 한다.
// 변수 user가 선언되어 있지 않으면 평가시 에러가 발생한다.
// ?.은 빈 값인지 알아보는 기능이지 아예 없는 변수는 평가할 수 없다.

//----------------------------------------------------------------------------------------------------------------------------------------------
//                                                                  단락 평가
// ?.는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 그렇기 때문에 함수 호출을 비롯한 ?. 오른쪽에 있는 부가 동작은 일어나지 않는다.
let user = null;
let x = 0;
user?.sayHi(x++); // 아무 일도 일어나지 않는다. user가 null이기 때문
alert(x); // 0, x는 증가하지 않는다.

//----------------------------------------------------------------------------------------------------------------------------------------------
//                                                             ?.()와 ?.[]
// ?.은 연산자가 아니다. ?.은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체 이다.
// 존재 여부가 확실치 않은 함수를 호출할 때 ?.()를 사용한다.
let user1 = {
    admin() {
        alert("관리자 계정")
    }
}

let user2 = {};

user1.admin?.(); // 관리자 계정
user2.admin?.(); // 아무일도 안일어남
// ?.()를 통해 admin의 존재 여부를 확인한다. user1엔 admin이 정의되어 있기 때문에 메서드가 제대로 호출되지만
// user2엔 admin이 정의되어 있지 않았음에도 메서드를 호출하면 에러를 발생시키지 않고 그냥 평가만 멈춘다.

// 마찬가지로 ?.[]를 사용하여 객체 프로퍼티에 접근하는 경우 존재 여부가 확실하지 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다.
let user1 = {
    firstName: "Violet"
};
let user2 = null;

let key = "firstName";

alert(user1?.[key]); // Violet, firstName이 존재하기 때문에 동작
alert(user2?.[key]); // undefined, firstName이 없기 때문에 평가를 멈추고 undefined 반환

// ?.은 delete와 조합 가능하다
delete user?.name; // user가 존재하면 user.name을 삭제한다.

// (!) ?.은 읽기나 삭제하기에는 사용할 수 있지만 쓰기에는 사용할 수 없다.
// user?.name = "Violet" // user가 존재하면 user.name에 Violet을 할당해라는 사용할 수 없다. 즉 할당 연산자 왼쪽에서 사용할 수 없다.
// 근거: undfined = "Violet"이 되기 때문

