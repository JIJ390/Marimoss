const homeBox = document.querySelector("[name=homeBox]");
const plusBox = document.querySelector("[name=plusBox]");
const crownBox = document.querySelector("[name=crownBox]");
const titleInput = document.querySelector("[name=searchInput]");
const searchMark = document.querySelector("[name=searchMark]");

// 마이 페이지 이동 버튼
const myPageBtn = document.querySelector("[name=myPageBtn]");

let main;

let pageStatus = 'mainPage';

document.addEventListener("DOMContentLoaded", () => {
  main = document.querySelector("#main");
})


// 검색창 엔터 이벤트 부여
titleInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {

    const searchKey = titleInput.value.trim();

    if (searchKey.length == 0) {
      alert("검색어가 없습니다");
      return;
    }

    searchTitleBoard(searchKey);
    return;

  }
});

searchMark.addEventListener("click", () => {

  const searchKey = titleInput.value.trim();

  if (searchKey.length == 0) {
    alert("검색어가 없습니다");
    return;
  }

  searchTitleBoard(searchKey);
  return;


})

// 메인 페이지 버튼
homeBox.addEventListener("click", () => {

  fetch("/homeView")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'mainPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

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
      pageStatus = 'boardInsertPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);

});


// 랭크 페이지 버튼
crownBox.addEventListener("click", () => {

  fetch("/rankView?rankTime=allTime")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'rankPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);

});



// 마이 페이지 이동
myPageBtn?.addEventListener("click", () => {
  fetch("/myPage/myPageView")
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("실패")
  })
  .then(html => {
    pageStatus = 'myPage';

    main.innerHTML = html;
    window.scrollTo({top: 0});

    // 임의로 이벤트 발생
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);

    sideModal.classList.toggle("side-modal-none");
  })
  .catch(err => console.error);

});


// 프로필 모달 내부 버튼
const pwChangeBtn = document.querySelector("[name=pwChangeBtn]");
const memberDelBtn = document.querySelector("[name=memberDelBtn]");

// 비밀번호 변경 페이지 이동동
pwChangeBtn?.addEventListener("click", () => {
  fetch("/myPage/pwChangeView")
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("실패")
  })
  .then(html => {
    pageStatus = 'pwChange';

    main.innerHTML = html;
    window.scrollTo({top: 0});

    // 임의로 이벤트 발생
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);

    sideModal.classList.toggle("side-modal-none");
  })
  .catch(err => console.error);
})

// 회원 탈퇴 페이지 이동 버튼 클릭 동작
memberDelBtn?.addEventListener("click", () => {
  fetch("/myPage/memberDelView")
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("실패")
  })
  .then(html => {
    pageStatus = 'memberDel';

    main.innerHTML = html;
    window.scrollTo({top: 0});

    // 임의로 이벤트 발생
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);

    sideModal.classList.toggle("side-modal-none");
  })
  .catch(err => console.error);
})



const sideCloseBtn = document.querySelector("#sideCloseBtn");
const sideModal = document.querySelector(".side-modal");
const profileBox = document.querySelector("[name=profileBox]");
const bellBox = document.querySelector("[name=bellBox]");

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



// 비밀번호 찾기 페이지 이동
const pwFindBtn = document.querySelector("#pwFindBtn");

pwFindBtn?.addEventListener("click", () => {

  // 모달 닫기
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


  // 페이지 이동
  fetch("/myPage/pwFindView")
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("실패")
  })
  .then(html => {
    pageStatus = 'pwFind';

    main.innerHTML = html;
    window.scrollTo({top: 0});

    // 임의로 이벤트 발생
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);

  })
  .catch(err => console.error);

})






// 프로필!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

profileBox?.addEventListener("click", () => {
  if (loginMember === null) {

    document.querySelector("#blackDisplay").classList.toggle("overlay");
    loginModal.classList.toggle("side-modal-none");

    return;
  }

  sideModal.classList.toggle("side-modal-none");
  alarmModal.classList.add("side-modal-none");
})


// 알람 모달!!!

const alarmModal = document.querySelector(".alarm-modal");


bellBox?.addEventListener("click", () => {
  alarmModal.classList.toggle("side-modal-none");
  sideModal.classList.add("side-modal-none");
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


        sendAuthKey(inputEmail, "signUp");
        
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
const sendAuthKey = (inputEmail, authStatus) => {

  const emailObj = {
    "inputEmail" : inputEmail, // 이메일
    "authStatus" : authStatus  // 인증번호 유형
  }

  fetch("/email/sendAuthKey", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(emailObj)

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




/**
 * 검색 함수 
 * @param {*} searchKey 
 */
const searchTitleBoard = (searchKey) => {

  fetch("/searchView?searchKey=" + searchKey)
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'mainPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

      titleInput.value = '';

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);
  

}






///////////////////////////////////////////////////////////////////////////////////

/* 알람 */

/* ***** SSE(Server-Sent Events) ***** 

-일반적인 흐름-
클라이언트(요청) -> 서버(응답)

-SSE- ;서버가 이벤트를 보낸다
클라이언트(요청) <- 서버(응답)

- 서버가 클라이언트에게 실시간으로
  데이터를 전송할 수 있는 기술

- HTTP 프로토콜 기반으로 동작

- 단방향 통신(ex : 무전기, 지휘통제실)

1) 클라이언트가 서버에 연결 요청
   -> 클라이언트가 서버로부터 데이터 받기 위한 대기 상태에 돌입
      (EventSource : 객체 이용)
      
2) 서버가 연결된 클라이언트에게 데이터를 전달
   (서버 -> 클라이언트 데이터 전달하라는 
    요청을 또 Ajax 를 이용해 비동기 요청)

*/

/**  SSE 연결하는 함수 
 * -> 연결을 요청한 클라이언트가 
 *    서버로부터 데이터가 전달될 때까지 대기 상태가 됨
 *    (비동기)
 * 
 * 
*/
const connectSse = () => {

  /* 로그인이 되어있지 않은 경우 함수 종료 */
  // common.html 에 있는 구문!!
  if (notificationLoginCheck === false) return;

  console.log("connectSse() 호출");

  // 서버의 "/sse/connect" 주소로 연결 요청
  const eventSource = new EventSource("/sse/connect");

  // -----------------------------------------------------------
  /* !!!!!!!!!!!!!!!!메시지 왔을 때 숫자 변경!!!!!!!!!!!! */
  /* 서버로 부터 메시지가 왔을 경우(전달 받은 경우) */
  eventSource.addEventListener("message", e => {
    console.log(e.data); // e.data : 전달 받은 메시지
                         // -> Spring HttpMessageConverter 가
                         //    JSON 으로 변환해서 응답해줌

    const obj = JSON.parse(e.data);
    console.log(obj); // 알림을 받는 사람 번호, 읽지 않은 알림 개수

  });

  /* 서버 연결이 종료된 경우(타임아웃 초과) */
  eventSource.addEventListener("error", e => {
    console.log("SSE 재연결 시도");

    eventSource.close();  // 기존 연결 닫기

    // 5 초 후 재연결 시도 / 위 구문과 붙어있을 시 오류가 발생할 수 있어
    // 5 초 간 딜레이를 줌
    setTimeout( () => connectSse(), 5000);
  });

}


/** 알림 메시지 전송 함수
  - 알림을 받을 특정 클라이언트의 id
    (memberNo 또는 memberNo 를 알아낼 수 있는 값)

  [동작 원리]
  1) AJAX 를 이용해  SseController 에 요청

  2) 연결된 클라이언트 대기명단(emmiters) 에서
     클라이언트 id 가 일치하는 회원을 찾아
     메시지 전달하는 send() 메서드를 수행

  3) 서버로부터 메시지를 전달 받은 클라이언트의 
     eventSource.addEventListener() 가 수행됨
*/

const sendNotification = (type, url, pkNo, content) => {

  // type : 댓글, 답글, 게시글 좋아요 등을 구분하는 값
  // url : 알림 클릭 시 이동할 페이지 주소
  // pkNo : 알림 받는 회원 번호 또는 
  //        회원 번호를 찾을 수 있는 pk 값
  // content : 알림 내용

  /* 로그인이 되어있지 않은 경우 함수 종료 */
  // common.html 에 있는 구문!!
  if (notificationLoginCheck === false) return;


  /* 서버로 제출할 데이터를 JS 객체 형태로 저장 */
  const notification = {
    "notificationType"    : type,
    "notificationUrl"     : url,
    "pkNo"                : pkNo,
    "notificationContent" : content
  }


  fetch("/sse/send", {
    method : "POST",
    headers : {"Content-type" : "application/json"},
    body : JSON.stringify(notification)
  })
  .then(response => {
    if (!response.ok) { // 비동기 통신 실패
      throw new Error("알림 전송 실패");
    }
    console.log("알림 전송 성공");
  })  // 두번째 then을 안씀 ** 전달할 데이터가 없기 때문
  .catch(err => console.error(err));

};
