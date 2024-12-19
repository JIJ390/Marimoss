const homeBox = document.querySelector("[name=homeBox]");
const plusBox = document.querySelector("[name=plusBox]");
const crownBox = document.querySelector("[name=crownBox]");

let main;

document.addEventListener("DOMContentLoaded", () => {
  main = document.querySelector("#main");
})

// 게시글 등록 버튼
homeBox.addEventListener("click", () => {

  fetch("/homeView")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      main.innerHTML = html;

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);

});


// 게시글 등록 버튼
plusBox.addEventListener("click", () => {

  fetch("/board/insertView")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      main.innerHTML = html;

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);

});


















const sideCloseBtn = document.querySelector("#sideCloseBtn");
const sideModal = document.querySelector(".side-modal");
const profileBox = document.querySelector("[name=profileBox]");

const loginModal = document.querySelector(".login-modal");
const loginCloseBtn = document.querySelector("#loginCloseBtn");


// x 버튼 클릭시 동작
sideCloseBtn?.addEventListener("click", () => {

  sideModal.classList.add("side-modal-none");
  

})

// 로그인 모달 종료
loginCloseBtn?.addEventListener("click", () => {
  document.querySelector("#blackDisplay").classList.remove("overlay");
  loginModal.classList.add("side-modal-none");

  // 내부 내용 초기화
  loginFrm.classList.remove("none-display");
  signUpFrm.classList.add("none-display");

  loginBottomSpan.innerText = "아직 회원이 아니신가요?";
  signUpBtn.innerText = "회원 가입";

  signFlag = 0;

  clearSignUp();

  clearLogin();

})

profileBox?.addEventListener("click", () => {
  if (loginMember === null) {

    document.querySelector("#blackDisplay").classList.toggle("overlay");
    loginModal.classList.toggle("side-modal-none");

    return;
  }

  sideModal.classList.toggle("side-modal-none");
})


const logoutBtn = document.querySelector(".logout-btn");

logoutBtn?.addEventListener("click", () => {
  location.href = "/member/logout";
})


// 회원 가입 화면 구성
const signUpBtn = document.querySelector(".signup-btn");
const loginBottomSpan = document.querySelector(".login-bottom-span");

const loginFrm = document.querySelector(".login-form");
const signUpFrm = document.querySelector(".signup-form");

// 회원 가입인지 로그인인지 상태 확인
let signFlag = 0;
// 초기값 0
// 0 일때 로그인 화면
// 1 일떄 회원가입 화면

signUpBtn.addEventListener("click", () => {

  clearSignUp();
  clearLogin();

  // 회원 가입 이동
  if (signFlag === 0) {

    loginFrm.classList.toggle("none-display");
    signUpFrm.classList.toggle("none-display");

    loginBottomSpan.innerText = "로그인 하러 가기";
    signUpBtn.innerText = "로그인";

    signFlag = 1;

    return;

  }

  // 로그인 이동
  if (signFlag === 1) {

    loginFrm.classList.toggle("none-display");
    signUpFrm.classList.toggle("none-display");

    loginBottomSpan.innerText = "아직 회원이 아니신가요?";
    signUpBtn.innerText = "회원 가입";

    signFlag = 0;
    
    return;

  }
});




//////// 회원 가입 유효성 검사

const memberEmail = document.querySelector("#signUpEmail");
const memberPassward = document.querySelector("#signUpPassward");
const passwordCheck = document.querySelector("[name=passwordCheck]");
const memberNickname = document.querySelector("[name=memberNickname]");

const emailCheck = document.querySelector("[name=emailCheck]");

const checkBtn = document.querySelector("#checkBtn");

// 이메일 형식 정규 표현식 객체
// 아무문자(영어,숫자,특문) @ 영어,숫자,하이픈 . 영어(2 글자 이상)
const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



let checkStatus = 'default';  // 기본 상태

let authTimer; // 타이머 역할의 setInterval을 저장할 변수
               // 타이머를 멈추는 clearInterval 수행을 위해 필요


checkBtn.addEventListener("click", () => {

  if (emailStatus === 'true') {
    alert("이미 인증되었습니다");
    return;
  }

  const inputEmail = memberEmail.value.trim();

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
      throw new Error("이메일 중복 검사 에러");
    })
    .then(count => {

      // 이미 이메일 존재
      if (count == 1) {
        alert("이미 가입된 이메일입니다");
      }

      else {
        sendAuthKey(inputEmail);
        
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

        const timeSpan = document.querySelector("#timeSpan");

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


/* 전달 받은 숫자가 10 미만(한 자리 수) 인 경우 
앞에 0을 붙여서 반환하는 함수 */
function addZero(num) {
  if (num < 10) return "0" + num;
  else          return num;
}






const checkBtn2 = document.querySelector("#checkBtn2");

// 이메일 확인 검사 상태
let emailStatus = 'false';

checkBtn2.addEventListener("click", () => {

  if (emailStatus === 'true') {
    alert("이미 인증되었습니다");
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

  if (emailCheck.value.trim().length == 0) {
    alert("인증번호를 입력해 주세요");
    return;
  }



  const obj = {
    "email"   : memberEmail.value.trim(), // 입력한 이메일 
    "authKey" : emailCheck.value.trim()    // 입력한 인증번호
  };

  console.log(obj);

  // 위 항목들 완료 시 비동기로 확인
  fetch("/email/checkAuthKey", {
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
      emailStatus = 'false';
      return;
    }
    
    // 4) 일치하는 경우
    // - 타이머 멈춤
    clearInterval(authTimer);
    timeSpan.innerText = '인증 완료';
    emailStatus = 'true';

    alert("인증되었습니다");

    // 더는 바꿀 수 없게
    memberEmail.readOnly = true; 
    emailCheck.readOnly = true; 

  })
  .catch(err => console.error(err));


})


// 유효성 검사 후 회원 가입
signUpFrm.addEventListener("submit", e => {
  
  if (emailStatus == 'false') {
    alert("이메일 인증을 완료해주세요");
    e.preventDefault();
    return;
  }

  const inputPw = memberPassward.value;
  
  // 비밀번호 정규표현식 검사
  const lengthCheck = inputPw.length >= 6 && inputPw.length <= 20;
  const letterCheck = /[a-zA-Z]/.test(inputPw); // 영어 알파벳 포함
  const numberCheck = /\d/.test(inputPw); // 숫자 포함
  const specialCharCheck = /[\!\@\#\_\-]/.test(inputPw); // 특수문자 포함


  if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
    alert("유효하지 않은 비밀 번호 입니다");
    memberPassward.focus();
    e.preventDefault();
    return;
  }

  if (passwordCheck.value !== inputPw) {
    alert("비밀번호가 제대로 입력되었는지 다시 확인해 주세요");
    passwordCheck.focus();
    e.preventDefault();
    return;
  }

  if (memberNickname.value.trim().length < 2) {
    alert("닉네임을 두 글자 이상으로 입력해주세요");
    memberNickname.focus();
    e.preventDefault();
    return;
  }

})

const loginEmail = document.querySelector("#loginEmail");
const loginPw = document.querySelector("#loginPw");
const autoLogin = document.querySelector("[name=autoLogin]");

// 로그인 유효성 검사
loginFrm.addEventListener("submit", e => {

  if (loginEmail.value.trim().length === 0) {
    alert("이메일을 입력해 주세요");
    loginEmail.focus();
    e.preventDefault();
    return;
  }

  if (loginPw.value.trim().length === 0) {
    alert("비밀번호를 입력해 주세요");
    loginPw.focus();
    e.preventDefault();
    return;
  }

})



/**
 * 회원 가입창 내부 초기화
 */
const clearSignUp = () => {

  emailStatus = 'false';
  checkStatus = 'default';  

  memberEmail.readOnly = false; 
  emailCheck.readOnly = false; 

  clearInterval(authTimer);

  timeSpan.innerText = '';
  
  emailCheck.value = '';

  memberEmail.value = '';
  memberPassward.value = '';
  passwordCheck.value = '';
  memberNickname.value = '';

}

/**
 * 로그인창 초기화
 */
const clearLogin = () => {
  loginEmail.value = '';
  loginPw.value = '';

  autoLogin.checked = false;
}




/**
 * 이메일 보내는 함수
 * @param {} inputEmail 
 */
const sendAuthKey = (inputEmail) => {

  fetch("/email/sendAuthKey", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : inputEmail

  })
  .then(resp => {
    if(resp.ok) return resp.text();
    throw new Error("이메일 발송 실패");
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
}