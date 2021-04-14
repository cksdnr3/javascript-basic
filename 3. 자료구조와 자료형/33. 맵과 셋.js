//                                                              맵과 셋

// 객체 - 키가 있는 컬렉션을 저장함
// 배열 - 순서가 있는 컬렉션을 저장함
// 맵 - 키가 있는 컬렉션을 저장하지만 키에 다양한 자료형을 허용한다는 점에서 객체와 다르다.
new Map(iterable) // -새로운 맵을 만든다. [키, 값] 쌍이 있는 이터러블(배열)을 선택적으로 넘길 수 있는데, 이때 넘긴 이터러블 객체는 맵 초기화에 사용된다.
map.set(key, vaule) // - key를 이용해 value를 저장하고 맵 자신을 반환한다.
map.get(key) // - key에 해당하는 값을 반환한다. key가 없다면 undefined를 반환한다.
map.has(key) // - key가 존재하면 ture, 존재하지 않으면 false를 반환한다.
map.delete(key) // -key에 해당하는 값을 삭제한다.
map.clear() // - 맵 안의 모든 요소를 제거한다.
map.size() // -요소의 개수를 반환한다.

// map[key]는 Map을 사용하는 바른 방법이 아니다.
// 위 방법을 사용하면 map에 요소를 추가할 수 있지만 Map을 일반 객체처럼 취급하게된다. map전용 메서드를 사용해서 요소를 추가set() 하거나 사용 get()해야 한다.

// 맵은 키로 객체를 허용한다. 객체는 불가능
let john = { name: "John" };
let visitCountMap = new Map(); // 방문자 수를 세는 map이라고 가정해 보았을때
visitCountMap.set(john, 123);  // 객체 john을 키로 사용해 값 123을 저장함
alert( visitCountMap.get(john) ); // 123

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  맵의 요소에 반복 작업하기
map.keys() // - 각 요소의 키를 모은 반복 가능한(이터러블) 객체를 반환한다.
map.values() // -각 요소의 값을 모은 이터러블 객체를 반환한다.
map.entries() // - 요소의 [키, 값]을 한 쌍으로 하는 이터러블 객체를 반환한다. 이 이터러블 객체는 for...of 반복문의 기초로 쓰인다.

let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]); // - 맵은 [키, 값]이 한 쌍으로 구성된 배열을 요소로 가진다. 문자열 'cucumber'와 숫자 500을 요소로 가진 배열이 키 cucumber 값 500인 맵의 요소임
for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
}; // - 맵의 키를 대상으로 반복
for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
}; // - 맵의 값을 대상으로 반복
for (let entry of recipeMap) {
    alert(entry); // [cucumber,500], [tomatoes,350], [onion,50]
}; // - [키, 값]으로 구성된 한 쌍을 대상으로 반복

// 맵은 삽입 순서를 기억한다. - 맵은 값이 삽입된 순서대로 순회를 실시한다. 객체가 프로퍼티 순서를 기억하지 못하는 것과는 다르다.

// 여기에 더하여 맵은 배열과 유사하게 내장 메서드 forEach()도 지원한다.
recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`); // - cucumber: 500, tomatoes: 350, onion: 50
});
//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      Object.entries: 객체를 맵으로 바꾸기
// 각 요소가 키-값 쌍인 배열이나 이터러블 객체를 초기화 용도로 맵에 전달해 새로운 맵을 만들 수 있다.
let map = new Map([
    ['1',   'str1'],
    [1,     'num1'],
    [true,  'bool1'],
]); // [키, 값]쌍인 배열(객체)을 맵으로 바꾼 것
alert( map.get('1') ); // str1, 객체는 키를 문자열로 바꾸지만 맵은 키에 모든 자료형을 허용하기 때문에 키의 숫자1과 문자열1을 구분할 줄 안다.

// 평범한 객체를 가지고 맵을 만들고 싶다면 내장 메서드 Object.entries(obj)를 사용하면 된다.
// 이 메서드는 객체의 키-값 쌍을 요소 [키, 값]으로 가지는 '배열'을 반환한다.
let obj = {
    name: "John",
    age: 30,
};
let map = new Map( Object.entries(obj) );
alert( map.get('name') ); // John, 객체 obj를 맵으로 바꿈
// obj = [
//    ['name', 'John'],
//    ['age', 30],
// ];  객체 obj를 배열로 바꾸고 이 배열을 이용해 새로운 맵을 만든 것
//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  Object.fromEntries: 맵을 객체로 바꾸기
// 각 요소가 [키, 값] 쌍인 배열을 순회해 객체로 바꿔준다.
let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]); // 이제 prices = {banana: 1, oreange: 2, meat: 4}; 이다.
alert(prices.orange); // 2

// 맵에 저장되어있는 자료를 서드파티 코드에서 넘겨 받을 때 자료를 객체로 넘겨받길 원할 때 이방법을 사용할 수 있다.
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4); // 서드파티 코드라고 가정할 때

let obj = Object.fromEntries(map.entries()); // 서드파티 코드에서 받아온 맵인 map을 객체로 바꿈
// fromEntries()의 인수는 이터러블 객체가 와야 하기 때문에 [키, 값]을 한 쌍으로 순회해 반환하는 메서드 entries는 생략할 수 있다.
alert(obj.orange); // 2

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                           셋 Set
// 셋(Set)은 중복을 허용하지 않는 값을 모아놓은 특별한 컬렉션이다. 셋(Set)에는 키가 없는 값이 저장된다.
new Set(iterable) // 셋을 만든다. 이터러블 객체를 전달받으면(대게 배열을 전달받음) 그 안의 값을 복사해 셋에 넣어준다.
set.add(value) // 값을 추가하고 셋 자신을 반환한다.
set.delete(value) // 값을 제거한다. 호출 시점에 셋 내에 값이 있어서 제거 하면 true를 아니면 false를 반환한다.
set.has(value) // 셋 내에 value가 존재하면 true, 아니면 false를 반환한다.
set.clear() // 셋을 비운다.
set.size()// 셋에 값의 개수를 반환한다.

// 셋 내에 동일한 값이 있다면 set.add(동일한 값)을 해도 어떤 반응도 일어나지 않는다.
// 방문자 방명록을 만든다고 가정할 때 한명의 방문자를 여러번 기록하지 않도록 할 때 사용한다.

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" }; // 유저들

set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary); // 유저 john과 mary는 두번 방문함

alert( set.size ); // 3, 셋에는 유일무이한 값 john, pete, mary가 각 한개씩만 저장된다.

for (let user of set) {
    alert(user.name); // John, Pete, Mary set에 추가된 순서대로 요소들이 출력된다.
};

// *arr.find를 통해 배열의 중복요소를 찾을 수도 있지만 셋에 비해 성능이 떨어진다. 중복요소를 다룰 때는 셋을 사용하는 것이 좋다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          셋의 값에 반복 작업하기
// for...of 혹은 forEach()를 통해 반복작업 가능
let set = new Set(["orange", "apple", "banana"]); // 배열(이터러블)을 인수로 보내 set에 배열의 값들을 순서대로 저장한다.
for (let value of set) alert(value); // orange, apple, banana 순서대로 출력
set.forEach((value, valueAgain, set) => {
    alert(value); // orange, apple, banana 순서대로 출력
});
// forEach()를 사용할 경우 3개의 인수를 보내야 하는데 valueAgain에 value를 다시 적어준다. 3개의 인수가 필요한 map.forEach()와의 호환성을 위한 장치이다.
// 이렇기 때문에 맵과 셋을 교체하기 쉽다.
set.keys() // 셋 내의 모든 '값'을 포함하는 이터러블 객체를 반화한다. 셋은 키가 없기 때문에 값을 포함하는 객체를 반환
set.values() // set.keys()와 동일하게 작동 키가 없기 때문 맵과의 호환성을 위해 만들어진 메서드이다.
set.entries() // 셋 내의 각 값을 이용해 만든 [value, value] 배열을 반환한다. 맵과의 호환성을 위해 만들어진 메서드이다.

// 맵과 셋은 순서를 가지고 있어 이터러블가능 하지만 index를 이용해 특정 요소를 빼오거나 요소를 재정렬하는 것은 불가능하다.