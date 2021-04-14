//                                                   코드 구조

//                                                      문(statement)
// 문은 어떤 작업을 수행하는 문법 구조와 명령어를 의미한다. 
// 서로 다른 문은 세미콜론으로 구분한다.
// 코드의 가독성을 높이기 위해 각 문은 서로 다른 줄에 작성하는 것이 일반적이다.

//                                                      세미콜론
// 줄 바꿈이 있다면 세미콜론을 생략 할 수 있다.
// 줄 바꿈이 있으면 '암시적' 세미콜론으로 해석한다. - 대부분의 경우 줄 바꿈은 세미콜론을 의미하지만 항상은 아님
alert(3 +
    1
    + 2); // 6
// 위와 같이 어떤 줄이 '+'로 끝나는 것처럼 "불완전한 표현식"에는 완전한 표현식이 되도록 해야하기 때문에 자동 줄바꿈이 안된다.
// (i) 에러 예제
alert(anycode)
[1, 2].forEach(alert) // 에러난다. 대괄호 앞의 코드는 자동 줄바꿈이 일어나지 않아 단일문으로 처리한다.
// 문이 끝나면 세미콜론을 넣는 습관을 들이자.