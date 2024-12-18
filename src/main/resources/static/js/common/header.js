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

loginCloseBtn?.addEventListener("click", () => {
  document.querySelector("#blackDisplay").classList.remove("overlay");
  loginModal.classList.add("side-modal-none");

  // 내부 내용 초기화
  loginFrm.classList.remove("none-display");
  signUpFrm.classList.add("none-display");

  loginBottomSpan.innerText = "아직 회원이 아니신가요?";
  signUpBtn.innerText = "회원 가입";

  signFlag = 0;

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

let signFlag = 0;


signUpBtn.addEventListener("click", () => {

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

const checkBtn = document.querySelector("#checkBtn");

// 이메일 형식 정규 표현식 객체
// 아무문자(영어,숫자,특문) @ 영어,숫자,하이픈 . 영어(2 글자 이상)
const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

checkBtn.addEventListener("click", () => {

  const inputEmail = memberEmail.value.trim();

  // 1. 입력 값(inputEmail) 이 이메일 형식이 아닌 경우
  if (regEx.test(inputEmail) === false) {
    alert("유효한 이메일 형식이 아닙니다");
    return;
  }

  // 2. 입력된 이메일이 이미 존재할 경우(중복 검사, AJAX)
  fetch("/member/emailCheck?email=" + inputEmail)
    .then(response => {
      if (response.ok) { // 응답 상태코드 200(성공) 인 경우
        return response.text(); // 응답 결과를 Text 형태로 반환(parsing)
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
        alert("인증 번호가 전송되었습니다");
      }

    })
    .catch(err => console.error(err));
})


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
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("이메일 발송 실패");
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
}