// 개발을 하다 보면 함수에 객체나 배열을 전달해야 하는 경우가 생기곤 한다. 가끔은 객체나 배열에 저장된 데이터 전체가 아닌 일부만 필요한 경우가 생기기도 한다.
// 객체나 배열을 변수로 분해할 수 있게 해주는 특별한 문법인 구조 분해 할당을 사용할 수 있다.
//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                      배열 분해하기
let arr = ["Bora", "Lee"];

let [firstName, sruName] = arr; // 구조 분해 할당을 이용해 firstName엔 arr[0]을 surName엔 arr[1]을 할당했다.
alert(firstName) // Bora
alert(surName) // Lee

// 아래 예시처럼 split같은 배열을 반환하는 메서드를 활용할 수도 있다.
let [firstName, surName] = "Bora Lee".split(" ");
alert(firstName) // Bora
alert(surName) // Lee

// 분해는 배열의 파괴를 의미하지 않는다. 배열의 요소를 변수로 바꿔줄 뿐 배열은 그대로 존재함

// (I)쉼표를 사용하여 요소를 무시할 수도 있다.
let [firstName, , title] = ["Julius", "Cesar", "Consul", "of the Roman Republic"] // 4개의 요소중 2번째 요소까지 가져오고 1번째 요소는 쉼표로 무시함
alert(title); // Consul

// (I)할당 연산자 우측엔 모든 이터러블이 올 수 있다.
// 배열뿐만 아니라 모든 이터러블에 구조 분해 할당을 적용할 수 있다.
let [a, b, c] = "abc" // 문자열을 분해함 a = "a" b = "b" c = "c"
let [one, two, three] = new Set([1, 2, 3]) // 셋에 인자로 배열을 보내 이터러블 객체로 반환 받고 그것을 분해함 one = 1, two = 2, three = 3

// (I)할당 연산자 좌측엔 무엇이든 올 수 있다.
// 할당할 수 있다면 무엇이든 올 수 있다. 예를 들어 객체 프로퍼티도 가능
let user = {};
[user.name, user.surName] = "Bora Lee".split(" "); // user객체의 name과 surName에 문자열을 쪼개 배열로 반환받은 것을 분해해 할당함
alert(user.name); // Bora
alert(user.surName); // Lee

// (I) entries()로 반복하기
let user = {
    name: "John",
    age: 30,
};

for (let [key, value] of Object.entries(user)) { // 객체 user를 키와 값이 쌍인 배열로 바꾸고 키는 변수 key에 값은 변수 value에 순회하며 할당함
    alert(`${key} : ${value}`) // name : John, age: 30
};
// 물론 맵에서도 이 메서드를 활용할 수 있다.
let user = new Map();
user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user) { // 맵은 형태가 이터러블로 존재하기 때문에 키는 변수 key에 값은 변수 value에 순회하며 할당된다.
    alert(`${key} : ${value}`) // name : John, age : 30
}

// (I) 변수 교환 트릭
// 두 변수에 저장된 값을 교환할 때 구조 분해 할당을 사용할 수 있다.
let guest = "Jane";
let admin = "pete";

[guest, admin] = [admin, guest]; // 구조 분해 할당을 이용해 guest엔 admin의 값을 admin엔 guest의 값을 할당한다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  '...'로 나머지 요소 가져오기
// 배열 앞쪽에 위치한 값 몇 개만 필요하고 그 이후 이어지는 나머지 값들은 한데 모아서 저장하고 싶을 때 사용한다.
// ...를 붙인 매개변수 하나를 배열의 마지막 순서에 추가하면 나머지 요소를 배열의 형태로 가져온다.
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// name1에 Julius를 name2에 Cesar를 그리고 나머지를 rest에 배열로담아 할당한다.
alert(name1); // Julius
alert(name2); // Caesar

alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  기본값
// 할당하고자 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않고 할당값이 없으면 undeifined를 반환한다.
let [firstName, surName] = [];
alert(firstName); // undefined
alert(surName); // undefined

// = 을 이용하면 할당한 값이 없을 때 기본으로 할당해 줄 값인 기본값을 설정할 수 있다.
let [name = "Guest", surName = "Annonymous"] = ["Julius"];
// name은 Guest라는 기본값을 설정했지만 Julius를 분해 할당했기 때문에 Julius가 담기고 surName은 분해 할당값은 없지만 기본 값 Annonymous가 있기 때문에
// undefined가 아닌 Annonymous가 담긴다.
alert(name); // Julius
alert(surName); // Annonymous

// 표현식이나 함수 호출도 기본값이 될 수 있다.
let [surName = prompt("성을 입력하세요"), name = prompt("이름을 입력하세요")] = ["김"];
// surName은 분해 할당값이 있기 때문에 굳이 함수를 호출해 기본값을 설정할 필요가 없다.
// name은 분해 할당값이 없기 때문에 기본값 설정을 위해 함수를 호출한다.
alert(surName); // 김
alert(name); // prompt로 입력받은 값

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          객체 분해하기
// 구조 분해 할당을 이용해 객체도 분해할 수 있다.
// 할당 연산자 우측엔 분해하고자 하는 객체를, 좌측엔 상응하는 객체 프로퍼티의 '패턴'을 넣는다.
let {var1, var2} = {var1:"value1", var2:"value2"}; // 기본 문법

// 예시
let options = {
    title: "Menu",
    width: 100,
    height: 200,
};

let {title, width, height} = options; // let {width, height, title} = options; 순서가 상관 없기 때문에 두 코드는 똑같이 작동한다.
// 프로퍼티 패턴에 상응하는 변수에 값을 담기 때문에 순서가 상관 없다. options.title과 변수 title은 같은 값을 가지고 있음
alert(title); // Menu
alert(width); // 100
alert(height); // 200

// 목표 변수를 이용해 프로퍼티 패턴과 다른 변수를 사용할 수도 있다. 변수 옆에 :을 붙이고 목표 변수를 적으면 된다.
let options = {
    title: "Menu",
    width: 100,
    height: 200,
};

let {width: w, height: h, title: t} = options;

alert(t); // Menu
alert(h); // 200
alert(w); // 100

// 배열 분해 할당과 마찬가지로 = 을 통해 기본값을 할당할 수도 있고 목표 변수와 함께 기본값도 사용이 가능하고 함수나 표현식도 사용가능하다.
let options = {
    title: "Menu"
};
let {width: w = 100, height: h = prompt("높이를 말해주세요")} = options;
// 배열과 마찬가지로 할당 연산자 우측의 분해하고자 하는 객체의 프로퍼티가 없을 때만 함수는 호출한다.
alert(title); // Menu
alert(w); // 100
alert(h); // prompt로 받아온 값

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                               나머지
// 분해하려는 객체(우측)의 프로퍼티 개수가 할당하려는 변수(좌측)의 개수보다 많을 때 나머지 패턴을 사용하면 나머지를 저장할 수 있다.
// ...과 매개변수를 통해 매개변수에 객체의 형태로 나머지 프로퍼티 패턴을 저장할 수 있다.
let options = {
    title: "Menu",
    height: 200,
    width: 100,
};

let {title, ...rest} = options; // rest = {height : 200, width: 100}
alert(rest.height); // 200
alert(rest.width); // 100

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              중첩 구조 분해
// 객체나 배열이 다른 객체나 배열을 포함한 경우도 분해 할당을 할 수 있다.
let options = { // 용도에 따라 값을 저장함 size관련은 size 프로퍼티에 객체로 담음
    size: {
        width: 100,
        height: 200,
    },
    items: ["Cake", "Donut"],
    extra: true,
};

let {
    size: {
        width,  // size프로퍼티 안에 변수
        height
    },
    item: [item1, item2],   // item요소 안에 변수
    title = "Menu"  // title은 없기 때문에 = 을 사용해 기본값 할당
} = options;
// 분해 할당하지 않은 extra는 options객체의 프로퍼티로만 존재 변수에는 할당하지 않는다.
alert(width); // 100
alert(height); // 200
alert(item1); // Cake
alert(item2); // Donut
alert(title); // Menu
alert(extra); /* undefined */ alert(options.extra); // true
// 하지만 객체안의 객체에 있는 프로퍼티는 전용 변수가 있지만 size나 items에는 전용 변수가 없다는 점을 유의해야 한다.

//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                            똑똑한 함수 매개변수
// 함수에 매개변수가 많은데 이중 상당수는 선택적으로 쓰이는 경우가 종종 있다.
// 예를 들어 메뉴 생성에 관여하는 함수가 있다고 할 때 메뉴엔 너비, 높이, 제목, 항목리스트 등이 필요하기 때문에 이 정보를 매개변수로 받는다.
// 하지만 기본 값을 매개변수에 설정되어 있고 기본값을 사용하고 싶다면 호출 할 때에 굳이 인수를 넘길 필요가 없는데 인수를 넘겨야 할 수도 있고
// 인수의 순서가 헷갈릴 수도 있다. 이때 구조 분해 할당을 통해 이 두가지 문제를 해결할 수 있다.
function showMenu(title = "Untitle", width = 200, height = 100, list= []) {} // 메뉴를 보여주는 함수
showMenu("My menu", undefined, undefined, ["아이템1", "아이템2"]) // 너비와 높이를 기본값으로 사용하기 위해 인수를 굳이 undefined로 보내야함 *문제발생
// 코드가 지저분해 보이고 매개변수의 순서가 헷갈려 가독성이 떨어진다.
let options = {
    title: "My menu",                // 내가 선택해서 바꾸고 싶은 요소를 객체에 모은다.
    items: ["아이템1", "아이템2"],
};
function showMenu({title = "Untitled", height = 100, width = 200, item = []}) {
    alert(title); // My menu
    alert(height); // 100
    alert(width); // 200
    alert(item); // 아이템1, 아이템2 가 순서대로 나옴
}
showMenu(options); // showMenu를 호출할 때 내가 선택하고자 하는 요소를 모은 객체 options를 인수로 보내 구조 분해 할당을 한다.
// 내가 지정한 title과 item은 기본값을 덮어씌우고 지정하지 않은 height, width는 기본값을 사용한다.
// (목표 변수를 사용하지 않는다면) 객체 프로퍼티의 패턴과 변수이름이 같기 때문에 순서를 바꿔적어도 상관이 없어 헷갈릴 일도 없다.

// 이렇게 매개변수를 구조 분해할 때는 반드시 인수가 전달된다고 가정하고 사용해야 한다. 내가 사용하고자 하는 것을 모은 객체가 있으면 그것을 인수로 보내면
// 되지만, 모든 매개변수를 기본값으로 사용하고 싶다면 shoeMenu()처럼 인수를 보내지 않는 것이 아닌 showMenu({}) 처럼 빈객체를 인수로 보내야지만
// 빈객체를 구조 분해해서 매개변수를 기본값으로 사용할 수 있다.
function shouwMenu({title = "Menu", width = 100, height = 200} = {}) { // 매개변수 선언부에서 미리 빈객체를 선언하고 구조분해를 해도됨...
    alert(`${title}, ${width} ${height}`);
};
showMenu(); // Menu 100 200