//                                                              프로토타입 상속
// 개발을 하다 보면 기존에 있는 기능을 가져와 확장해야 하는 경우가 생긴다.

// 사람에 관한 프로퍼티와 메서드를 가진 user라는 객체가 있는데, user와 상당히 유사하지만 약간의 차이가 있는 admin과 guest객체를 만들어야
// 한다고 가정 보자. 이때 user의 메서드를 복사하거나 다시 구현하지 않고 user에 약간의 기능을 얹어 admin가 guest객체를 만들 수 있지 않을까?
// 라는 생각이 들 것이다.
// 자바스크립트 언어의 고유 기능인 프로토타입 상속(prototypal inheritance)을 이용하면 위와 같은 생각을 실현할 수 있다.

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                          [[Prototype]]
// 자바스크립트의 객체는 [[Prototype]]이라는 숨김 프로퍼티를 갖는다. 이 숨김 프로퍼티 값은 null이거나 다른 객체에 대한 참조가되는데,
// 다른 객체를 참조하는 경우 참조 대상을 프로토타입이라 부른다.

// 프로토타입의 동작 방식은 신비스러운면이 있다. object에서 프로퍼티를 읽으려고 하는데 해당 프로퍼티가 없으면 자바스크립트는 자동으로 프로토타입에서
// 프로퍼티를 찾기 때문이다. 프로그래밍에선 이런 동작 방식을 프로토타입 상속이라 부른다. 언어 차원에서 지원하는 편리한 기능이나 개발 테크닉 중 프로토타입
// 상속에 기반해 만들어진 것들이 많다.

// [[Prototype]] 프로퍼티는 내부 프로퍼티이면서 숨김 프로퍼티이지만 다양한 방법을 사용해 개발자가 값을 설정할 수 있다.
// __proto__을 사용하면 값을 설정할 수 있다.
let animal = {
    eats: true,
    walk() {
        alert("동물이 걷는다."); // 메서드도 상속해 호출 가능
    }
};
let rabbit = {
    jumps: true
};
rabbit.__proto__ = animal; // rabbit의 프로토타입 프로퍼티의 참조 객체를 animal로 할당함 -> rabbit의 프로토타입이 animal임rabbi

alert(rabbit.eats); // true
alert(rabbit.jumps); // true
// 객체 rabbit에서 프로퍼티를 얻고싶은데 해당 프로퍼티가 없다면, 자바스크립트는 자동으로 animal이라는 객체에서 프로퍼티를 얻는다.
// rabbit은 animal을 상속 받는다.

// (I) __proto__는 [[Prototype]] 용 getter,setter이다.
// __proto__는 [[Prototype]]과는 다르다. __proto__는 [[Prototype]]의 getter이자 setter일 뿐 프로퍼티 그자체는아님

// 하위 호환성 때문에 여전히 __proto__ 를 사용할 순 있지만 비교적 근래에 작성된 스크립트에선 __proto__ 대신 함수 Object.PrototypeOf 나
// Object.setPRototypeOf 을 써서 프로토타입을 get하거나 set한다.
// 근래엔 왜 __proto__를 쓰지 않는지와 두 함수의 자세한 설명에 대해선 이어지는 챕터에서 다룰 예정!!

// __proto__는 브라우저 환경에서만 지원하도록 자바스크립트 명세서에 규정하였는데, 실상은 서버 사이드를 포함한 모든 호스트 환경에서 __proto__
// 를 지원한다. [[Prototype]]보다는 __proto__가 조금 더 직관적이어서 이해하기 쉬우므로, 본 튜토리얼의 예시에선 __proto__를 사용한다.


// 프로토타입 체인은 지금까지 살펴본 예시들보다 길어질 수 있다.
let longEar = {
    earLength = 10,
    __proto__: rabbit // 객체 lengEar는 rabbit을 상속 받고 객체 rabbit은 animal을 상속받는다.
}
longEar.walk(); // 동물이 걷습니다. , animal에서 상속 받음
longEar.jumps(); // true, rabbit에서 상속 받음

// 프로토타입 체이닝엔 두 가지 제약사항이 있다.
// 1. 순환 참조는 허용되지 않는다. __proto__를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다.
// 2. __proto__의 값은 객체나 null만 가능하다. 다른 자료형은 무시!
// 여기에 더하여 객체엔 오직 하나의 [[Prototype]]만 있을 수 있다는 당연한 제약도 있다. 객체는 두 개의 객체를 상속받지 못한다.

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                         쓸 때는 프로토타입을 사용하지 않는다.
// 프로토타입은 프로퍼티를 읽을 때만 사용한다.
// 프로퍼티를 추가, 수정하거나 지우는 연산은 객체에 직접 해야 한다.

let animal = {
    eats: true,
    walk() {
        // anyCode...
    }
};

let rabbit = {
    __proto__: animal
}

rabbit.walk = function() {
    alert("깡충깡충");      // 프로토타입의 객체를 변경하는 것이 아닌 rabbit객체에 추가된 것.
};
rabbit.walk(); // 깡충깡충, 자바스크립트 엔진은 자신의 객체에서 먼저 프로퍼티를 찾고 없으면 프로토타입을 찾는다.


// 그런데 접근자 프로퍼티는 setter함수를 통해서 프로퍼티에 값을 할당하므로 이 규칙이 적용되지 않는다.
// 접근자 프로퍼티에 값을 할당하는 것은 함수를 호출하는 것과 같기 때문이다.
// 값을 할당하기만 했지만 호출하는 것과 유사한 결과를 도출하기 때문

let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    get fullName() {
        return `${this.name} ${this.surname}`
    }
};

let admin = {
    __proto__: user,
    isAdimin: true
};

alert(admin.fullName); // John Smith, getter로 풀네임을 얻음

admin.fullName = "Alice Cooper"; // 프로토타입 안에 있는 setter함수를 통해 호출하기 때문에 프로퍼티가 변경이 가능하다.

alert(admin.fullName); // Alice Cooper
alert(user.fullName); // John Smith, 수정으로부터 보호받음

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                          this가 나타내는 것
// 위 예시를 보면 set fullName(value) 본문의 this엔 어떤 값이 들어가지? 라는 의문을 가질 수 있다.
// 프로퍼티 this.name과 this.surname에 값을 쓰면 그 값이 user에 저장될까, 아니면 admin에 저장될까? 라는 의문도 생기 수 있다.
// 위 예시에 결과에 나온 것처럼 this는 포토타입에 영향을 받지 않는다.
// 메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 this는 언제나 . 앞에 있는 객체가 된다.

// 객체 하나를 만들고 여기에 쓸모 있는 메서드를 많이 구현해 놓은 다음, 여러 객체에서 이 커다란 객체를 상속받게 하는 경우가
// 대부분이기 때문에 이런 특징을 잘 알아야한다. 상속받은 메서드를 사용하더라도 객체는 프로토아입이아닌 자신의 상태를 수정한다.
// 예시
let animal = {
    walk() {
        if (!this.isSleeping) {
            alert("walk!");
        }
    },
    sleep() {
        this.isSleeping = true; // sleep()을 호출하면 isSleeping프로퍼티가 추가되고 true가 할당된다.
    }
};

let rabbit = {
    name: "토순이",
    __proto__: animal
};
rabbit.sleep(); // isSleeping프로퍼티가 추가되고 true가 할당된다. 하지만 animal객체엔 isSleeping이 없음

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined, 프로토타입의 상태를 바꾸진 않음

// 실제로 bird, snake같이 다른 동물들이 animal을 상속받아 메서드를 사용한다 가정해봅시다. 이 객체들도 rabbit처럼 animal의 메서드를 사용할 것이다.
// 이때 상속받은 메서드의 this는 animal이 아닌 실제 메서드가 호출되는 시점의 점 앞에있는 객체가 된다.
// 따라서 this에 데이터를 쓰면 animal이 아닌 해당 객체의 상태가 변한다.
// 즉, 메서드는 공유되지만 객체의 상태는 공유되지 않는다.

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                      for...in 반복문
// for...in은 상속 프로퍼티도 순회 대상에 포함시킨다.
let animal = {
    eats: true
};
let rabbit = {
    jumps: true,
    __proto__: animal
};

alert(Object.keys(rabbit)); // jumps, Object.keys로 순회하면 인식 못함
for(let prop in rabbit) alert(prop); // jumps, eats - 프로퍼티 key를 순회한다.

// obj.hasOwnProperty(key)를 이용하면 상속 프로퍼티를 for...in 반복문 순회 대상에서 제외할 수 있다. 이 내장 메서드는 key에 대응하는 프로퍼티가
// 상속 프로퍼티가 아니고 obj에서 직접구현되어있는 프로퍼티일 때 true를 반환한다.

// 아래 예시처럼 상속프로퍼티를 걸러낼 수도 상속프로퍼티 만을 대상으로 무언가를 할 수도 있다.
for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop); // 객체 자체 prop은 true, 상속 prop은 false를 할당

    if (isOwn) {
        alert(`내 프로퍼티 ${prop}`); // jumps
    } else {
        alert(`상속받은 프로퍼티 ${prop}`); // eats, Object.prototype의 프로퍼티들은 어디갔을까??
    }
}

// 위 예시의 상속 관계를 그림으로 나타내면 다음과 같다. rabbit은 animal을, animal은 Object.prototype을, Object.prototype은 null을 상속받는다.
// animal이 Object.prototype을 상속 받는 이유는 객체 리터럴 방식으로 선언하였기 때문이다.
// 전역 환경에 있는 객체는 Object.prototype을 자동으로 상속받는듯??

// for..in안에서 사용한 메서드 hasOwnProperty를 사용한 것을 보면 hasOwnProperty는 왜 상속 프로퍼티에 포함되지 않았을까요??
// 그 이유는 Object.prototype에 있는 모든 프로퍼티가 enumerable: false인 프로퍼티이기 때문이다.
// for..in은 오직 enumarable: true인 프로퍼티만 순회하기 때문에 hasOwnProperty는 얼럿창에 출력되지 않는다.

// (I) Objevt.keys, Object.values 같이 객체의 키-값을 대상으로 무언가를 하는 메서드 대부분은 상속프로퍼티를 제외하고 동작한다.
// 프로토타입에서 상속받은 프로퍼티는 제외하고, 해당 객체에서 정의한 프로퍼티만 연산 대상에 포함한다.