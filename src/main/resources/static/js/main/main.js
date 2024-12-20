
let obserbFlag = document.querySelector(".obserb-flag");
let boardContainer = document.querySelector(".board-container");
let boardBoxesOrigin = document.querySelectorAll(".board-box");
let lastCp = 1;

document.addEventListener('DOMContentLoaded', () => {

  /* 메인 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'mainPage') {
    return;
  }

  /* 임의로 함수 발생 시켜 초기화*/
  obserbFlag = document.querySelector(".obserb-flag");

  boardContainer = document.querySelector(".board-container");
  boardBoxesOrigin = document.querySelectorAll(".board-box");
  lastCp = 1;

  boardModal = document.querySelector(".board-modal");
  modalFlag = 0;

  // 최초 열 두개 게시글 이벤트 부여
  boardBoxesOrigin.forEach(box => {
    // 다운로드 버튼과 좋아요 버튼 효과 추가해야함

    box.addEventListener("click", e => {

      const boardNo = box.getAttribute("data-value");

      // 다운로드 버튼 동작 막기
      const downloadBtn = box.querySelector("[name=downloadBtn");
      if (e.target == downloadBtn) {
        return;
      }

      // 좋아요 버튼
      const likeBtnDefault = box.querySelector("[name=likeBtnDefault]");
      const likeCountSpan = box.querySelector("[name=likeCountSpan]");

      if (e.target == likeBtnDefault) {

        if (loginMember === null) {
          alert("로그인 후 이용해 주세요");
          return;
        }

        likeChange(boardNo, likeBtnDefault, likeCountSpan);

        return;
      }


      // 모달 채우기
      updateModal(boardNo);

      e.stopPropagation(); // 이벤트 전파 방지 모달이 열리면서 꺼지는 현상 방지
      modalOpen(); 

    })
  })

 

      
  const io = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return; 
      //entry가 interscting 중이 아니라면 함수를 실행하지 않습니다.

      lastCp++;

      //페이지를 불러오는 함수를 호출합니다.
      updateBoardList(lastCp);
        
    });
  });
    
  io.observe(obserbFlag);


  /* 이벤트 부여 함수들은 모두 domcontentloded 내부에 작성!! */
  window.addEventListener("click", e => {
  
    // 모달 레이어 가 닫혀있지 않고 모달 레이어 바깥을 눌렀을 때만 동작!!
    if (!(modalFlag == 0)
        && (e.target !== boardModal)) {
          modalClose();
    }
  })
  
  
  // 모달 내부 요소 클릭 시 이벤트 전파 막기
  boardModal.addEventListener("click", e => {
  
    if (e.target !== modalCloseBtn){
      e.stopPropagation();
    }
  
  });
  



})

// 스크롤 내릴 시 작동하는 함수
const updateBoardList = (lastCp) => {

  fetch("/updateBoardList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: lastCp
  })
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("목록 조회 실패")
  })
  .then(html => {

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // 이벤트 부여 함수
    const boardBoxes = tempDiv.querySelectorAll(".board-box");

    // 모달 열기
    boardBoxes.forEach((box) => {

      box.addEventListener("click", e => {

        const boardNo = box.getAttribute("data-value");

        // 다운로드 버튼 동작 막기
        const downloadBtn = box.querySelector("[name=downloadBtn");
        if (e.target == downloadBtn) {
          return;
        }

        // 좋아요 버튼
        const likeBtnDefault = box.querySelector("[name=likeBtnDefault]");
        const likeCountSpan = box.querySelector("[name=likeCountSpan]");

        if (e.target == likeBtnDefault) {
        
          if (loginMember === null) {
            alert("로그인 후 이용해 주세요");
            return;
          }

          likeChange(boardNo, likeBtnDefault, likeCountSpan);

          return;
        }

        // 모달 채우기
        updateModal(boardNo);
        
        e.stopPropagation(); // 이벤트 전파 방지 모달이 열리면서 꺼지는 현상 방지
        modalOpen(); 

      })
    })

    // 새로운 콘텐츠를 하나씩 추가 (쓸데 없는 div 추가 없이 구현 가능)
    while (tempDiv.firstChild) {
      boardContainer.appendChild(tempDiv.firstChild);
    }

  })
  .catch(err => console.error)

}


/* 모달 관련 함수 */
let boardModal = document.querySelector(".board-modal");
let modalFlag = 0;

// 모달 열기
const modalOpen = () => {
  boardModal.style="opacity : 1";
  boardModal.classList.add("modal-index");

  document.querySelector("#blackDisplay").classList.add("overlay");

  modalFlag = 1;
}

// 모달 닫기
const modalClose = () => {
  boardModal.style="opacity : 0";
  boardModal.classList.remove("modal-index");

  document.querySelector("#blackDisplay").classList.remove("overlay");

  modalFlag = 0;
}

/**
 * 모달 내부 내용 적기
 * @param {*} boardNo 
 */
const updateModal = (boardNo) => {
  
  fetch("/updateModal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: boardNo
  })
  .then(resp => {
    if (resp.ok) return resp.text();
    throw new Error("목록 조회 실패")
  })
  .then(html => {

    // 모달 채우기
    boardModal.innerHTML = html;

    // 비율에 따라 길이 맞추기
    const modalImage = boardModal.querySelector("[name=modalImg]");

    const imageRatio = modalImage.naturalWidth / modalImage.naturalHeight;
    const modalRatio = 0.7;


    if (imageRatio > modalRatio) {
      // 가로가 긴 경우
      modalImage.classList.add("width");
    }
    else {
      // 세로가 긴 경우
      modalImage.classList.add("height");
    }


    const etcBtn = boardModal.querySelector("[name=etcBtn]");
    const modalImgMenu = boardModal.querySelector(".modal-img-menu");
    const likeBtn = boardModal.querySelector("[name=likeBtn]");


    etcBtn.addEventListener("click", () => {
      modalImgMenu.classList.toggle("modal-menu-close");
    })

    likeBtn.addEventListener("click", () => {

      if (loginMember === null) {
        alert("로그인 후 이용해 주세요");
        return;
      }

      likeChangeModal(boardNo);

    })


    window.addEventListener("click", () => {
      modalImgMenu.classList.add("modal-menu-close");
    })

  })
  .catch(err => console.error)
}




/**
 * 좋아요 버튼 함수
 */
const likeChangeModal = (boardNo) => {

  fetch("/board/likeChange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: boardNo
  })
  .then(resp => {
    if (resp.ok) return resp.json();
    throw new Error("변경 실패")
  })
  .then(result => { 

    if (result.likeResult == 'insert') {
      likeBtn.src = "/images/main/heartFilled.png"
    }

    if (result.likeResult == 'delete') {
      likeBtn.src = "/images/main/heartEmpty.png"
    }

  })
  .catch(err => console.error)


} 


/**
 * 좋아요 버튼 함수 메인 페이지
 */
const likeChange = (boardNo, likeBtnDefault, likeCountSpan) => {

  fetch("/board/likeChange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: boardNo
  })
  .then(resp => {
    if (resp.ok) return resp.json();
    throw new Error("변경 실패")
  })
  .then(result => { 

    if (result.likeResult == 'insert') {
      likeBtnDefault.src = "/images/main/whiteHeartFilled.png"
    }

    if (result.likeResult == 'delete') {
      likeBtnDefault.src = "/images/main/whiteHeart.png"
    }

    likeCountSpan.innerText = result.likeCount;


  })
  .catch(err => console.error)

} 

