//                                                          화살표 함수 다시 살펴보기
// 화살표 함수는 단순히 함수를 짧게 쓰기 위한 용도로 사용되지 않는다. 화살표 함수는 몇 가지 독특하고 유용한 기능을 제공한다.
// 자바스크립트를 사용하다 보면 저 멀리 동떨어진 곳에서 실행될 작은 함수를 작성해야 하는 상황을 자주 만나게 된다.
// 예시
// * arr.forEach(func) - 저 멀리 있는 func가 forEach가 호출될 때 배열 arr의 요소 전체를 대상으로 실행된다.
// * setTimeout(func) - 저 멀리 있는 func가 setTimeout메서드 내장 스케줄러에 의해 실행된다.

// 이처럼 자바스크립트에선 함수를 생성하고 그 함수를 어딘가에 전달하는 것이 아주 자연스럽다.
// 그런데, 어딘가에 함수를 전달하게 되면 함수의 컨텍스트를 잃을 수 있다. 이럴 때 화살표 함수를 사용하면 현재 컨텍스트를 잃지 않아 편리하다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          화살표 함수에는 this가 없다.

// 화살표 함수엔 this가 없다. 화살표 함수 본문에서 this에 접근하면, 외부에서 값을 가져온다.
let group = {
    title: "1모둠",
    student: ["보라", "호진", "지민"],

    showList() {
        this.students.forEach(
            student => alert(this.title + ':' + student)
        );
    }
};
group.showList();
// 화살표 함수 본문에 있는 this.title은 화살표 함수 바깥에 있는 메서드인 showList가 가리키는 대상과 동일해진다. 즉 this.title은 group.title과 같다.

// 위 예시에서 화살표 함수 대신 일반 함수를 사용했다면 에러가 발생했을 것이다.
let group = {
    showList() {
        this.student.forEach(function(student) {
            alert(this.title + ':' + student)
        });
    }
};
// 에러는 forEach에 전달되는 함수의 this가 undefined 이어서 발생했다. 익명함수 function는 객체안에 있지 않기 때문에

// (!) 화살표 함수는 new와 함께 실행할 수 없다.
// this가 없기 때문에 화살표 함수는 생성자 함수로 사용할 수 없다.

// (I) 화살표 함수 vs .bind
// 화살표 함수와 일반함수를 bind를 사용해서 호출하는 것 사이에는 미묘한 차이가 있다.
// * bind는 함수의 한정된 버전을 만든다.
// * 화살표 함수는 어떤 것도 바인딩시키지 않는다. 단지 this가 없을 뿐이다. 화살표 함수에서 this를 사용하면 일반 변수 서칭과 마찬가지로 this의 값을
// 외부 렉시컬 환경에서 찾는다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                  화살표 함수엔 arguments가 없다.

// 화살표 함수는 일반 함수와 다르게 모든 인수에 접근할 수 있게 해주는 유사 배열 객체 arguments를 지원하지 않는다.
// 이런 특징은 현재 this값과 arguments정보를 함께 실어 호출을 포워딩해 주는 데코레이터를 만들 때 유용하게 사용된다.