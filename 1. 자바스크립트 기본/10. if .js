//                                                      if와 '?'를 사용한 조건 처리
// 조건에 따른 행동을 취해야 할 때 조건문 if혹은 물음표 연산자라고 불리는 조건부 연산자 ?을 사용하면 된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          if 문
// if(...)문은 괄호 안에 들어가는 조건을 평가하는데, 그 결과가 true이면 코드 블록이 실행된다.

// 불린형으로의 변환
// if문은 괄호 안의 표현식을 평가하고 그 결과를 불린값으로 변환한다.
// 숫자 0, 빈 문자열"", null, undefined, NaN은 불린형으로 변환 시 모두 false가 된다. 디런 값들을 falsy(거짓같은) 값이라고 부른다.
// 이 외의 값은 true가 되므로 truthy(참같은)값이라고 부른다.

// else절
// else 뒤에 이어지는 코드 블록은 조건이 거짓일 때 실행된다.

// else if로 복수 조건 처리하기
// 유사하지만 약간씩 차이가 있는 조건 여러 개를 처리해야 할 때 사용

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              조건부 연산자 '?'
let result = condition ? value1 : value2;
// condition이 truthy면 value1(왼쪽 값) falthy면 value2(오른쪽 값)이 반환된다.

let accessAllowed;
let age = prompt('나이입력', '');

if (age > 18) {
    accessAllowed = true;
} else {
    accesAllowed = false;
}

// 위 예시에서 조건문은 아래와 같이 짧게 바꿀 수 있다.
let accessAllowed = (age > 18) ? true : false;

// 다중 '?'

let age = prompt('나이를 입력해주세요.', 18);

let message = (age < 3) ? '아기야 안녕?' :
    (age < 18) ? '청소년' :
    (age < 100) ? '성인' :
    '100살이 넘음';
// age가 truthy면 왼쪽 값을 falthy면 오른쪽 조건부연산자를 실행한다.

// 부적절한 '?'
// 조건부 연산자?를 if 대용으로 사용하면 안된다.
let company = prompt('자바스크립트는 어떤 회사가 만들었을까요?', "");

(company == "Netscape") ?
    alert("정답") : alert("오답");

// 사람은 수직으로 읽기를 좋아한다. 그러므로 if문으로 코드를 수직으로 작성하는 것이 가독성이 좋음

    if (company == 'Netscape') {
        alert('정답입니다!');
      } else {
        alert('오답입니다!');
      }

