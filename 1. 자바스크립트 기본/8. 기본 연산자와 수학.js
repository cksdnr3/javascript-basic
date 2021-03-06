//                                                          기본 연산자와 수학

//                                                      용어: 단항, 이항, 피연산자
// 피연산자(operand)는 연산자가 연산을 수행하는 대상 5 * 2에는 왼쪽 피연산자 5와 오른쪽 피연산자 2 두 개의 피연산자가 있다.
// 피연사나는 인수(argument)라고도 불린다.
// 피연산자를 하나만 받는 연산자를 단항(unary)연산자라고 부른다.
// 두 개의 피연산자를 받는 연산자는 이항(binary)연산자라고 부른다.
// 마이너스 연산자(-)는 피연산자의 부호를 뒤집는 단항연산자로도 사용가능하고 두 연산자의 값을 빼는 이항연산자로도 사용된다.

//                                                          수학
// 자바스크립트에는 평범한 4개의 연산자 외에 나머지 연산자 %와 거듭제곱 연산자**가 있다.

// 나머지 연산자 % (remainder operator)
// a % b 는 a를 b로 나눈 뒤 그 나머지를 정수로 반환한다.

// 거듭제곱 연산자** (exponentiation operator)
// a ** b 는 a를 b번 곱한 값이 반환된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          이항 연산자 +와 문자열 연결
// 덧셈 연산자 +는 대게 숫자를 더한 결과를 반환하지만 자바스크립트에서는 피연산자가 문자열일 경우 문자열을 병합한다.
// 따라서 피연산자중 하나가 문자열이면 다른 피연산자도 문자열로 변환된다.
alert(2 + 2 + "1")// 221이 아닌 41이 출력, 연산은 왼쪽에서 오른쪽으로 순차적으로 두 항씩만 진행된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          단항 연산자 +와 숫자형으로의 변환
// 덧셈 연산자 +는 단항 연산자로 사용할 수 있다.
// 숫자형에 단항연산자 +가 붙은경우 아무일도 없지만, 숫자가 아닌경우 숫자형으로 변환이 일어난다.
// Number(value)와 동일한 동작
// HTML에서 값을 가져올 때 문자형을 숫자형으로 쉽게 변환 가능

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          할당 연산자
// 무언가를 할당할 때 쓰이는 = 는 할당(assignment)연산자이다. 우선순위 3으로 매우낮아 보통 마지막에 작동된다.

// 값을 반환하는 할당 연산자
// 자바스크립트에서 대부분의 연산자들은 값을 반환한다. x = value를 호출하면 value가 x에 쓰여지고, value가 반환된다.
let a = 1;
let b = 2;
let c = 3 - (a = b + 1); // a에 b + 1을 덮어 씌우고 반환한다.  

alert( a ); // 3 
alert( c ); // 0
// (!) 위 예시는 할당연산자의 이해를 돕기위한 것 예시 처럼 코드를 짜면 가독성이 떨어짐

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  할당 연산자 체이닝
let a, b, c;
a = b = c = 2 + 2;
alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
// 할당연산자 여러개를 연결한 경우 평가는 우측부터 진행된다. 2 + 2 부터 왼쪽으로

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      복합 할당 연산자
// 변수에 연산자를 적용하고 그 결과를 같은 변수에 저장하는 연산자
let n = 2;
n = n + 5;
n = n * 2;

let n = 2;
n += 5; // n = n + 5와 같음
n *= 2; // n = n * 2와 같음
// 복합 할당 연산자는 우선순위가 할당 연산자와 동일하다. 따라서 대부분의 다른 연산자가 실행된 후에 실행된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                       증가 . 감소 연산자
// ++, -- 는 숫자를 1증가시키거나 감소시킴
// (!) 증/감 연산자는 변수에만 사용가능

// 전위 연산자 - 값을 증가시키고 증가시킨 값을 반환
// 후위 연산자 - 값을 반환하고 반환한 후에 값을 증가시킴
let counter = 1;
let a = counter++; // 후위연산자는 1이 반환되고 그 후에 값을 증가시킴
let a = ++counter; // 전위연산자는 값을 증가시고 반환되기 때문에 2가반환된다.

// (I) 코드 한 줄엔, 특정 동작 하나에 관련된 내용만 작성하는게 좋다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                         쉼표 연산자(comma operator)
// 여러 표현식을 코드 한 줄에서 평가할 수 있게 해준다. 표현식 각각은 모두 평가되지만 마지막 표현식의 결과만 반환된다.
let a = (1 + 2, 3 + 4);
alert( a ); // 7, 1 + 2와 3 + 4 모두 평가되지만 마지막에 평가된 3 + 4만 반환
// (I) 쉼표의 우선순위는 매우 낮다.
// 할당 연산자 보다도 낮다. 그래서 괄호가 없으면 3이 반환됨
