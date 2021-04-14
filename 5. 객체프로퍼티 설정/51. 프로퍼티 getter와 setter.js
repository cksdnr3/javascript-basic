//                                                              프로퍼티 getter와 setter
// 객체의 프로퍼티는 두 종류로 나눠진다.
// 첫 번째는 지금 까지 사용해온 데이터 프로퍼티(date property)이다. 그저 데이터를 담고 사용하는 용도이다.
// 두 번째는 접근자 프로퍼티(accessor property)라 불리는 새로운 종류의 프로퍼티이다. 접근자 프로퍼티의 본질은 함수인데, 이 함수는 값을 흭득(get)하고
// 설정(set)하는 역할을 담당한다. 그런데 외부 코드에서느 함수가 아닌 일반적인 프로퍼티처럼 보인다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              getter와 setter
// 접근자 프로퍼티 getter와 setter는 메서드로 표현된다. 객체 리터럴안에서 getter와 setter메서드는 get과 set이라는 예약어로 나타낼 수 있다.
let obj = {
    get propName() {
        // 무언가 내용
        // obj.propName을 사용하려 할 때 실행되는 코드
    },
    set propName(value) {
        // 무언가 내용
        // obj.propName = value를 적어 프로퍼티를 추가,수정하려 할 때 실행되는 코드
    }
};

// 이 객체에 fullName이라는 프로퍼티를 추가해 fullName이 John Smith가 되도록 해보자. 기존 값을 복사 붙여넣기 하지 않고 fullName이 'John Smith'가 되도록
// 하려면 접근자 프로퍼티를 구현하면 된다.
// 예시
let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
alert(user.fullName); // John Smith, 함수 형태의 접근자 프로퍼티를 일반 프로퍼티처럼 사용할 수 있다.
// 접근자 프로퍼티는 이런 아이디어에서 출발했다. 접근자 프로퍼티를 사용하면 함수처럼 호출하지 않고, 일반 프로퍼티 접근처럼 평범하게 프로퍼티 값을
// 얻을 수 있다.

// setter를 마저 추가해 프로퍼티를 추가, 수정할 수 있게 해보자.
// 예시
let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};
user.fullName = "Alice Cooper"; // setter프로퍼티에 값을 할당해 set fullName이 실행된다.

alert(user.name); // Alice
alert(user.surname); // Cooper

// 이렇게 getter와 setter메서드를 구현하면 객체엔 fullName이라는 가상의 프로퍼티가 생긴다. 가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않는다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                             접근자 프로퍼티 설명자
// 접근자 프로퍼티 설명자는 데이터 프로퍼티 설명자와 다르다.
// 접근자 프로퍼티 설명자는 value와 writable이 없는 대신 get과 set이라는 함수가 있다.

// * get - 인수가 없는 함수로, 프로퍼티를 읽을 때 동작
// * set - 인수가 하나인 함수로, 프로퍼티에 값을 입력할 때 호출됨
// * 나머지는 데이터 프로퍼티와 동일

// 기존의 getter와 setter의 내용을 defineProperty를 통해 get과 set플래그 정보에 적어도 똑같이 getter와 setter를 만들 수 있다.
let user = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});
alert(user.fullName); // John Smith - getter
for (let key in user) alert(key); // name, surname get, set프로퍼티는 숨어 있음

// 프로퍼티는 접근자 프로퍼티나 데이너 프로퍼티 중 한 종류에만 속하고 둘 다에 속할 수 없다.
// 한 프로퍼티에 get과 value플래그를 동시에 설정하면 에러가남.

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                          getter와 setter똑똑하게 활용하기
// getter와 setter를 실제 프로퍼티 값을 감싸는 래퍼(wrapper)처럼 사용하면, 프로퍼티 값을 원하는 대로 통제할 수 있다.
// 아래 예시에선 name을 위한 setter를 만들어 user의 이름이 너무 짧아지는 걸 방지하고 있다. 실제 값은 별도의 프로퍼티 _name에 저장된다.
let user = {
    get name() {
        return this._name; // 값은 _name프로퍼티에 저장되지만, 실제 호출은 name getter를 사용한다.
    },
    set name(value) {
        if (value.length < 4) { // 입력한 이름이 짧다면 if문 실행
            alert("네 글자 이상으로 구성된 이름을 입력하세요!");
            return; // undefined 반환 alert()동작만 구현하면 됨.
        }
        this._name = value; // _name 프로퍼티를 만들고 value를 할당함.
    }
}
// user의 이름은 _name에 저장되고, 프로퍼티에 접근하는 것은 getter와 setter를 통해 이뤄진다.
// 기술적으론 외부 코드에서 user._name을 사용해 이름에 바로 접근할 수 있다. 그러나 밑줄 "_"로 시작하는 프로퍼티는 객체 내부에서만 활용하고
// 외부에서는 건드리지 않는 것이 관습이다.

//---------------------------------------------------------------------------------------------------------------------------------------------
//                                                          호환성을 위해 사용하기
// 접근자 프로퍼티는 언제 어느 때나 getter와 setter를 사용해 데이터프로퍼티의 행동과 값을 원하는 대로 조정할 수 있게 해준다는 점에서 유용하다.
// 데이터 프로퍼티 name과 age를 사용해서 사용자를 나타내는 객체를 구현한다고 가정해보자.
function User(name, age) {
    this.name = name;
    this.age = age;
}

let john = new User("John", 25);
alert(john.age); // 25

// 그런데 곧 요구사항이 바뀌어서 age 대신에 birthday 를 저장해야 한다고 가정해보자.
// age 보다는 birthday 를 사용하는 것이 더 정확하고 편리하다.

function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}

let john = new User("john", new Date(1992, 6, 1));

// 이렇게 생성자 함수를 수정하면 기존 코드 중 프로퍼티 age를 사용하고 있는 코드도 수정해 줘야 한다.
// age가 사용되는 부분을 모두 찾아서 수정하는 것도 가능하지만, 시간이 오래 걸린다. 게다가 age는 가지고 있어도 썩 괜찮은 프로퍼티이기도 하다.

// 기존 코드들은 그대로 두도록 하고 대신 age를 위한 getter를 추가해 문제를 해결할 수 있다.
Object.defineProperty(this, "age", {
    get() {
        let todayYear = new Date().getFullYear();
        return todayYear - this.birthday.getFullYear(); // birthday로 바꾸고 싶은 코드는 바꾸고 age를 쓰고 싶은 코드는 그대로 두면 된다.
    }
})

alert(john.birthday); // birthday 사용 가능
alert(john.age); // age도 사용 가능

// 이제 키존 코드도 잘 작동하고, 멋진 프로퍼티도 새로 생겼네요?!
