//                                                       비교 연산자

//                                                     불린형 반환
// 다른 연산자와 마찬가지로 비교 연산자 역시 값을 반환한다. 반환 값은 불린형이다. true or false

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                   문자열 비교
// 자바스크립트는 사전편집순으로 문자열을 비교한다. 사전 뒤쪽의 문자열은 사전 앞쪽의 문자열보다 크다고 판단된다.
alert( 'Z' > 'A' ); // true, 알고리즘 2
alert( 'Glow' > 'Glee' ); // true, 알고리즘 4
alert( 'Bee' > 'Be' ); // true, 알고리즘 5
// 문자열 비교 알고리즘
// 1. 두 문자열의 첫 글자를 비교한다.
// 2. 첫 번째 문자열의 첫 글자가 다른 문자열의 첫 글자보다 크면(작으면), 첫 번째 문자열이 두 번째 문자열보다 크다고(작다고) 결론내고 비교를 종료한다.
// 3. 두 문자열의 첫 글자가 같으면 두 번째 글자를 같은 방식으로 비교한다.
// 4. 글자 간 비교가 끝날 때까지 이 과정을 반복한다.
// 5. 비교가 종료되고 문자열의 길이도 같다면 두 문자열은 동일하다고 결론, 비교가 종료되어도 두 문자의 길이가 다르면 길이가 긴 문자열이 더 크다고 결론

// (I) 정확히는 사전순이 아니라 유니코드 순이다.
// 사전 순과 유사하지만 완전히 같지는 않다.
// 유니코드 순은 대.소문자를 따진다는 것이다. 대문자 "A"와 소문자 "a"를 비교하면 소문자 a가 더크다. 인코딩된 유니코드 순서에서 소문자는 대문자가 끝난 뒤에나옴

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              다른 형을 가진 값 간의 비교
// 비교하려는 값의 자료형이 서로다르면 자바스크립트는 이 값들을 숫자형으로 바꾼다.
alert( '2' > 1 ); // true, 문자열 2가 숫자 2로 변환된후 비교진행
alert( '01' == 1); // true; 문자열 01이 숫자 1로 변환된 후 비교 진행
// 불린값의 경우 true는 1 false는 0으로 변환된 후 비교
alert( true == 1); // true
alert( false == 0); // true

// (I) 흥미로운 상황
let a = 0;
alert( Boolean(a) ); // false
let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
// == 비교시 b를 숫자로 바꿔 평가하지만 명시적변환 Boolean()에는 다른 규칙이 사용되기 때문에 숫자형은 false 문자형은 true로 다른 결과가 나옴

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          일치 연산자
// 동등 연산자 ==은 0과 false를 구별하지 못한다.
alert( 0 == false ); // true
alert('' == false); // true

// 일치연산자 ===를 사용하면 자료형이 다를경우 false를 '즉시' 반환한다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      null이나 undefined와 비교하기
// 일치연산자 ===을 사용해 null과 undefined를 비교하면 false를 반환하지만, 동등연산자 ==을 사용해 비교하면 true를 반환한다.
alert( null === undefined ); // flase
alert( null == undefined); // true
// 동등 연산자로 비교할 경우 null은 숫자변환시 0이고 undefined는 NaN이지만 둘은 각별한 커플처럼 취급되어 서로는 true를 반환하지만 다른 값들은 무조건 flase를 반환

// 기타 다른 비교연산자를 사용해 비교할 경우 null은 0 undefined는 NaN으로 변환후 비교

// null vs 0
alert( null > 0); // false, null > 0 에서 null은 0으로 변환되어 비교 0은 0과 같기 때문에 false를 반환
alert( null == 0 ); // false, 동등 연산자 비교시 null은 오직 자기자신과 undefined만이 true를 반환한다. 그 외에는 숫자로 변경되어 비교
alert( null >= 0 ); // true, null >= 0 에서 null은 0으로 변환되어 비교 0은 0과 크거나 같기 때문에 true를 반환

// 비교가 불가능한 undefiend
// undefined는 숫자 변환시 NaN이 되어 비교가 불가능 오직 null과 자기 자신만 동등비교 했을 때 true를 반환
