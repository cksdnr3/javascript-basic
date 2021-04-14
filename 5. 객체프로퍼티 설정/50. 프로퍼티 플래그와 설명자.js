//                                                          프로퍼티 플래그와 설명자

// 객체엔 프로퍼티가 저장된다. 프로퍼티는 단순히 키-값 쌍의 자료구조이지는 않다. 훨씬 더 유연하고 강력한 자료구조이다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          프로퍼티 플래그
// 객체 프로퍼티는 값과 함께 플래그(flag)라 불리는 특별한 속성 세 가지를 갖고 있다.
// * writable - true이면 값을 수정할 수 있다. false이면 읽기만 가능.
// * enumerable - true이면 반복문을 사용해 나열할 수 있다. false면 반복문을 통해 나열할 수 없음. 즉, true면 반복문에 포함됨.
// * configurable - true이면 프로퍼티 삭제나 플래그 수정이 가능하다. false면 프로퍼티 삭제와 플래그 수정이 불가능하다.

// 평범한 방식으로 프로퍼티를 만들면 해당 프로퍼티의 플래그는 모두 true가 된다.

Object.getOwnPropertyDescriptor(obj, propertyName);
// obj - 정보를 얻고자 하는 객체
// propertyName - 정보를 얻고자 하는 객체 내 프로퍼티

// 위 메서드를 호출하면 프로퍼티 설명자(descriptor)라고 불리는 객체가 반환되는데, 프로퍼티 값과 세 플래그에 대한 정보로 구성되어 있다.
let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
alert( JSON.stringify(descriptor, null, 2));
// alert 호출 결과
/* property descriptor:
{   "value": "John",
    "writable": true,
    "enumarable": true,
    "configurable": true
}
*/

// 메서드 Object.defineProperty(obj, propertyName, descriptor)를 사용하면 플래그를 변경할 수 있다.
// obj, propertyName - 설명자를 적용하고 싶은 객체와 객체 프로퍼티
// descriptor - 적용하고자하는 프로퍼티 설명자

// defineProperty메서드는 객체에 해당 프로퍼티가 있으면 원하는대로 플래그를 변경할 수 있다. 해당 프로퍼티가 없다면 인수로 넘겨받은 정보를 이용해
// 새로운 프로퍼티를 만든다. 이때 플래그 정보를 보내지 않으면 플래그 값은 자동으로 false가 된다.

let user = {};

Object.definedProperty(user, "name", { // 빈 객체에 name프로퍼티의 값을 John으로, 나머지 flag정보를 보내지 않는다.
    value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert(JSON.stringify(descriptor, null, 2));
// alert의 값
/*
{
    "value": "John",
    "writable": false,
    "enumarable": false,
    "configurable": false
}
*/

// 평범한 방식으로 객체 프로퍼티를 만들었을 때와 defineProperty를 이용해 프로퍼티를 만들었을 때의 가장 큰 차이점은 플래그 값을 명시하지 않으면
// 플래그 값이 자동으로 false가 된다는 점이다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                             writable 플래그
// writable 플래그를 사용해 user.name에 값을 쓰지 못하도록 해보자.(수정 불가능)
let user = {
    name: "John"
};

Object.defineProperty(user, 'name', {
    writable: false
})

user.name = "Pete"; // 에러남 수정 불가능
// 이제 defineProperty를 사용해 writable플래그를 true로 변경하지 않는 한 객체의 name프로퍼티를 변경할 수 없다.

// (I) 에러는 엄격 모드에서만 발생한다.
// 비 엄격 모드에선 플래그를 변경해도 에러가 발생하지 않는다. 최근 문법임

// 아래 예시는 위 예시와 동일하게 작동한다.
let user = {};

Object.defineProperty(user, "name", {
    value: "John",
    // defineProperty를 사용해 새로운 프로퍼티를 만들 땐 일반적인 방법과 반대로 어떤 플래그를 true로 할지 명시해야 한다.
    enumerable: true,
    configurable: true
});

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          enumerable 플래그
// user에 커스텀 메서드 toString을 추가해 보자.
// 객체 내장 메서드 toString은 열거가 불가능한(non-enumerable)하기 때문에 반복문에 나타나지 않는다.
// 하지만 커스텀 toString을 추가하면 아래와 같이 반복문에 나타나게 되어 난감하다.
let user = {
    name: "John",
    toString() {
        return this.name;
    }
};
for (let key in user) alert(key); // name, toString

// 하지만 enumerable을 false로 설정하면 toString을 내장메서드 처럼 반복문에서 숨길 수 있다.
// Object.keys() 메서드 에서도 제외 된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          configurable 플래그
// 구성 가능하지 않음을 나타내는 플래그(non-configurable)는 몇몇 내장 객체나 프로퍼티에 기본으로 false로 설정되어 있다.
// 어떤 프로퍼티의 configurable플래그가 false로 설정되어 있다면 그 프로퍼티는 객체에서 지울 수 없다.

// 내장 객체 Math의 PI프로퍼티는 모든 플래그가 false라 쓰기, 열거, 구성이 불가능하다.
// 프로퍼티가 생성될 때부터 영원히 수정불가능한 프로퍼티가 되었다.

// 한 번 configurable플래그를 false로 설정하면 돌이킬 방법이 없다. defineProperty를 써도 값을 true로 되돌릴 수 없다.

// !모름 빈 객체에서 defineProperty로 프로퍼티 생성할 때 플래그 정의는 가능한거????

// (I) non-configurable과 non-wrtable은 다르다.
// configurable플래그가 false이더라도 writable플래그가 true이면 프로퍼티 값을 변경할 수 있다.
// non-configurable은 플래그 값 변경이나 프로퍼티 삭제를 막기위해 만들어진 것.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      Object.defineProperties(obj, descriptors)
// 이 메서드를 사용하면 프로퍼티 여러 개를 한 번에 정의할 수 있다.
Object.defineProperties(user, {
    name: {value : "John", writable: false},
    surname: {value: "Smith", writable: false},
});
// 값과 함께 플래그를 설정

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          Object.getOwnPropertyDescriptors(obj)
// 이 메서드를 사용하면 프로퍼티 설명자를 전부 한꺼번에 가져올 수 있다.
// 이 메서드를 Object.defineProperties({}, getOwnPropertyDescritpors(obj))로 사용하면 객체 복사 시 플래그도 함께 복사할 수 있다.
let clone = Object.defineProperties({}, getOwnPropertyDescriptors(obj));
// 기존 반복문을 통해 프로퍼티를 순회하면서 객체를 복사하면 플래그는 복사가 되지 않고, 심볼형 프로퍼티도 놓치게 된다.
// 하지만 이 메서드는 심볼형 프로퍼티를 포함한 프로퍼티 설명자 전체를 반환한다.
