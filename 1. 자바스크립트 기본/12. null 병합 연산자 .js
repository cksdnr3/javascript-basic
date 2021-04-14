//                                                          null 병합 연산자 '??'
// null 병합 연산자 (nullish coalescing operator)??를 사용하면 여러 피연산자 중 그 값이 확정되어 있는 변수를 찾을 수 있다.

a ?? b;
// a가 null도 아니고 undefined도 아니면 a, 그 외의 경우는 b
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder, firstName(null)과 lastName(null)을 먼저 비교한다. firstName이 null이니
// lastName이 반환된다. lastName(null)과 nickName(Supercoder)를 다음 비교한다. lastName이 null이니 nickName이 반환된다. 다음 nickName(Supercoder)와
// Anonymous를 비교한다. nickName은 Supercoder라는 값이 확정되어 있으니 nickName이 반환된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                            "??"와 "||"의 차이
// 위 예제는 ||로 바꿔도 똑같이 동작한다.
// 하지만 null과 undefined, 숫자 0을 구분 지어 다뤄야 할 때 이 차이점이 중요해진다.
// ||는 첫 번째 truthy를 반환, ??는 첫 번째 정의된 값을 반환
height = height ?? 100; // height가 정의되어 있지 않기 때문에 100이 할당 된다.

let height = 0;
alert(height || 100); // 100, height의 값인 0을 falsy로 판단해 다음 값인 100이 결과로나옴
alert(height ?? 100); // 0, height의 값이 정의되어 있기 때문에 정의된 첫 번째 값인 0이 결과로 나옴

// (I) ??의 연산자 우선순위는 5로 꽤 낮지만 그래도 '='와 '?' 보다는 먼저 평가된다.
// (I) 안정성 관련 이슈 때문에 ??는 &&나 ||와 함께 사용하지 못한다.

