document.addEventListener('DOMContentLoaded', () => {

  /* pwChange 아닐때 함수 실행 안함 */
  if (pageStatus !== 'pwChange') {
    return;
  }

  // 비밀번호 확인용 객체
  const checkObj = {
    "newPw"        : false,
    "newPwConfirm" : false
  }
  
  // input 요소
  const prePw = document.querySelector("#prePw");
  const newPw = document.querySelector("#newPw");
  const newPwConfirm = document.querySelector("#newPwConfirm");

  const checkSpan = document.querySelector("#checkSpan");


  newPw.addEventListener("input", () => {
  
    const inputPw = newPw.value.trim();
  
    if(inputPw.length === 0){ // 비밀번호 미입력
      checkSpan.innerText = "비밀번호를 입력해 주세요"
      checkSpan.classList.remove("confirm", "fail");
      checkObj.newPw = false;
      return;
    }
  
    // 비밀번호 정규표현식 검사
    const lengthCheck = inputPw.length >= 6 && inputPw.length <= 20;
    const letterCheck = /[a-zA-Z]/.test(inputPw); // 영어 알파벳 포함
    const numberCheck = /\d/.test(inputPw); // 숫자 포함
    const specialCharCheck = /[\!\@\#\_\-]/.test(inputPw); // 특수문자 포함
  
    // 조건이 하나라도 만족하지 못하면
    if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
      checkSpan.innerText = "유효하지 않은 비밀번호 형식입니다";
      checkSpan.classList.add("fail");
      checkSpan.classList.remove("confirm");
      checkObj.newPw = false;
      return;
    }

    checkSpan.innerText = "유효한 비밀번호 형식입니다";
    checkSpan.classList.add("confirm");
    checkSpan.classList.remove("fail");
    checkObj.newPw = true;
  
    // 비밀번호 확인이 작성된 상태에서
    // 비밀번호가 입력된 경우
    if(newPwConfirm.value.trim().length > 0) {
      checkPw();  // 같은지 비교하는 함수 호출
    }


  });

  
  /* ----- 비밀번호 확인이 입력되었을 때 ----- */
  newPwConfirm.addEventListener("input", () => {
    // 비밀번호 input 에 작성된 값이 유효한 형식일 때만 비교
    if(checkObj.newPw === true) {
      checkPw();
      return;
    }
  
    // 비밀번호 input 에 작성된 값이 유효하지 않은 경우
    checkObj.newPwConfirm = false;

  });


  /* ----- 비밀번호, 비밀번호 확인 같은지 검사하는 함수 ----- */
  function checkPw() {
    // 같은 경우
    if (newPw.value === newPwConfirm.value) {
      checkSpan.innerText = "유효한 비밀번호 형식입니다";
      checkSpan.classList.add("confirm");
      checkSpan.classList.remove("fail");
      checkObj.newPwConfirm = true;
      return;
    }

    // 다른 경우
    checkSpan.innerText = "비밀번호가 일치하지 않습니다";
    checkSpan.classList.add("fail");
    checkSpan.classList.remove("confirm");
    checkObj.newPwConfirm = false;
  };


  const pwChangeBtn = document.querySelector(".pw-change-btn");

  pwChangeBtn.addEventListener("click", () => {
  
    // 둘 중 하나라도 만족하지 않을 때 return;
    if (!checkObj.newPw || !checkObj.newPwConfirm) {
      console.log("실패");
      return;
    }

    if (prePw.value.trim().length == 0) {
      alert("현재 비밀번호를 입력해 주세요");
      prePw.focus();
      return;
    }
  })


})


