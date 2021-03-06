// keys(), values(), entries()는 포괄적인 용도로 만들어진 메서드이기 때문에 map, set, 배열 뿐만아니라 일반객체에도 사용가능하다.
// 일반객체도 유사한 메서드를 적용할 수 있는데 문법이 다름
// 사용하려면 일련의 합의를 준수해야 한다 자료구조를 직접 만들어 사용하려면 메서드를 직접 커스텀해서 사용해야 한다.
// 일반 객체에선 다음과 같은 메서드를 사용할 수 있다.
Object.keys(obj) // - 인수로 보낸 객체의 키가 담긴 배열을 반환한다.
Object.values(obj) // - 인수로 보낸 객체의 값이 담긴 배열을 반환한다.
Object.entries(obj) // - 인수로 보낸 객체의 [key, value] 쌍이 담긴 배열을 반환한다.

// 호출 문법
// 맵은 map.keys() 형태로 호출하지만 일반 객체는 Object.keys(obj) 처럼 인수로 사용하고자 하는 객체를 보내야한다.
// 또한 맵은 이터러블 객체를 반환하지만 일반 객체는 진짜 배열을 반환한다.

// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              객체 변환하기
// 객체는 map, filter 같은 유용한 메서드를 사용할 수 없다. 하지만 Object.entries(obj)를 통해 객체를 배열로만들고 배열의 유용한 메서드들을 사용한후
// Object.fromEntries(array)를 통해 다시 객체로 만들어 주면 된다.
// 위 방법을 사용해 가격 정보가 저장된 객체 prices의 프로퍼티 값을 두 배로 늘리는 코드의 예
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries( // 배열을 다시 객체로 만듬
    Object.entries(prices).map(( [key, value] ) => [key, value * 2] ) // 객체 prices를 배열로 만들어 map메서드로 연산함
);

alert(Object.values(doublePrices)); // 2, 4, 8

// entires로 객체를 배열을 담은 배열로 바꾸고 for.. of로 순회할때 카운트 변수에 배열안에 담긴 배열들을 순회하게되는데 배열안에 담긴 배열을 구조 분해해서
// 순회하는거죠?