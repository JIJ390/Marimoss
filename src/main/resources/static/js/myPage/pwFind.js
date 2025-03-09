document.addEventListener('DOMContentLoaded', () => {

  /* pwChange 아닐때 함수 실행 안함 */
  if (pageStatus !== 'pwFind') {
    return;
  }

  const pwFindCheckBtn = document.querySelector("#pwFindCheckBtn");
  const emailInput = document.querySelector("#emailInput");

  // 이메일 형식 정규 표현식 객체
  // 아무문자(영어,숫자,특문) @ 영어,숫자,하이픈 . 영어(2 글자 이상)
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  let checkStatus = 'default';  // 기본 상태

  let authTimer; // 타이머 역할의 setInterval을 저장할 변수
  // 타이머를 멈추는 clearInterval 수행을 위해 필요

  pwFindCheckBtn.addEventListener("click", () => {
  
    const inputEmail = emailInput.value.trim();
  
    // 1. 입력 값(inputEmail) 이 이메일 형식이 아닌 경우
    if (regEx.test(inputEmail) === false) {
      alert("유효한 이메일 형식이 아닙니다");
      return;
    }
  
    // 2. 입력된 이메일이 이미 존재할 경우(중복 검사, AJAX)
    fetch("/member/emailCheck?email=" + inputEmail)
      .then(resp => {
        if (resp.ok) { // 응답 상태코드 200(성공) 인 경우
          return resp.text(); // 응답 결과를 Text 형태로 반환(parsing)
        }
        throw new Error("인증 번호 전송 에러");
      })
      .then(count => {
  
        // 해당 이메일 존재하지 않을 때때
        if (count == 0) {
          alert("가입된 이메일이 아닙니다");
          return;
        }
  
        else {
          sendAuthKey(inputEmail, "pwFind");
          
          /* 메일이 비동기로 발송되는 동안 아래 JS 코드 수행 */
          // 2) 이메일 발송 메시지 출력 + 5 분 타이머 출력
          alert("인증 번호가 전송되었습니다");
  
          // 타이머
          const initTime = "05:00"; // 인증 초기 시간 지정
          const initMin  = 4;       // 초기값 5분에서 1초 감소된 후 분 
          const initSec  = 59;      // 초기값 5분에서 1초 감소된 후 초 / 4분 59초
  
          // 실제 줄어든 시간(분/ 초) 를 저장할 변수
          let min = initMin;
          let sec = initSec;
  
          clearInterval(authTimer);
  
          checkStatus = 'abled';
  
          const timeSpan = document.querySelector("#pwFindTimeSpan");
  
          timeSpan.innerText = initTime; // 05:00 문자열 출력
  
          // 1 초가 지날 때마다 함수 내부 내용이 실행되는 setInterval 작성
          authTimer = setInterval(() => {
            timeSpan.innerText = `${addZero(min)}:${addZero(sec)}`;
  
            // 0 분 0 초인 경우
            if (min === 0 && sec === 0) {
              clearInterval(authTimer); // 1 초마다 동작하는 setInterval 멈춤'
  
              timeSpan.innerText = '시간 만료';
  
              // 만료상태
              checkStatus = 'expiration';
            }
  
            if (sec === 0) {  // 동작하면 3:60이 되고 다음 시행에서 3:59 출력
              sec = 60;     
              min--;
            }
  
            sec--; // 1 초가 지날 때마다 sec 값 1 씩 감소
  
          }, 1000);
  
        }
  
      })
      .catch(err => console.error(err));
  })


  const pwFindBtn2 = document.querySelector("#pwFindBtn2");
  let pwFindBtn2flag = 0;

  pwFindBtn2.addEventListener("click", () => {

    const authKeyInput = document.querySelector("#authKeyInput");

    // 발급 중 연속 클릭 불가
    if (pwFindBtn2flag == 1) {
      return;
    }

    if (checkStatus === 'default') {
      alert("인증번호를 먼저 발급 받아 주세요");
      return;
    }
  
    if (checkStatus === 'expiration') {
      alert('인증번호가 만료되었습니다 \n다시 발급받아주세요');
      return;
    }
  
    if (authKeyInput.value.trim().length == 0) {
      alert("인증번호를 입력해 주세요");
      return;
    }

    const obj = {
      "email"   : emailInput.value.trim(), // 입력한 이메일 
      "authKey" : authKeyInput.value.trim()    // 입력한 인증번호
    };
  
    pwFindBtn2flag = 1;
  
    // 위 항목들 완료 시 비동기로 확인
    fetch("/email/checkAuthKeyPwFind", {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(obj)
  
    })
    .then(resp => {
      if(resp.ok) return resp.text();
      throw new Error("인증 에러");
    })
    .then(result => {
      console.log("인증 결과 : ", result);
  
      // 3) 일치하지 않는 경우
      if (result == 'false') {
        alert("인증 번호가 일치하지 않습니다.");
        pwFindBtn2flag = 0;
        return;
      }
      
      // 4) 일치하는 경우
      // - 타이머 멈춤
      clearInterval(authTimer);
      alert("임시 비밀번호가 발급되었습니다\n메인 화면으로 이동합니다");
      location.href = "/";

  
    })
    .catch(err => console.error(err));
  


  })


})



/* 전달 받은 숫자가 10 미만(한 자리 수) 인 경우 
앞에 0을 붙여서 반환하는 함수 */
function addZero(num) {
  if (num < 10) return "0" + num;
  else          return num;
}

