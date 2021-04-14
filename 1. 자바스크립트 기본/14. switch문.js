//                                                      switch 문
// 복수의 if 조건문은 switch문으로 바꿀 수 있다.

// 문법
switch(x) {
    case 'value1': // if (x === 'value1')
        // body
        break;

    case 'value2': // if (x === 'value2')
        // body
        break;

    defalut:
        // body
        break;
}
// 변수 x의 값과 첫 번째 case문의 값 value1을 일치 비교한다.
// 위에서 아래로 case문의 값을 비교하고 변수와 case문의 값이 일치하면 해당 body를 실행한다.
// break지시자를 만났을 경우 해당 switch문은 종료되고 break지시자가 없을경우 계속 이어서 switch문을 실행한다.
// 값이 일치하는 case문이 없다면 default문이 실행된다.

//------------------------------------------------------------------------------------------------------------------------------------------------
//                                                            자료형의 중요성
// switch문은 일치 비교로 조건을 확인한다. 그렇기 때문에 값의 형과 값이 같아야 case문이 실행된다. (자동 형변환 x)
let arg = prompt("값을 입력해주세요"); // 문자열로 반환
switch (arg) {
    case '0': // 문자열 '0'이면 body를 실행 하지만 body에 아무 것도 적혀 있지 않기 때문에 다음 case문 이어서 실행
    case '1':
        alert('0혹은 1을 입력하셨습니다.');
        break;

    case '2':
        alert('2를 입력하셨습니다.');
        break;
    
    case 3:
        alert('실행될 일 없는 코드'); // 만약 값을 3을 입력했을 경우 prompt에서 문자열이 반환되기 때문에 숫자 3은 절대로 일치할 수 없어 해당 case문은 실행될 일 없음
        break;
}