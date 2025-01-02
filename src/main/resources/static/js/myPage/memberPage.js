document.addEventListener('DOMContentLoaded', () => {

  /* 메인 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'memberPage') {
    return;
  }

  const memberNo = document.querySelector("#myPageMemberNickname").getAttribute("data-value");

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




      const boardUpdateBtn = box.querySelector("[name=boardUpdateBtn]");

      if (e.target == boardUpdateBtn) {

        if (loginMember === null) {
          alert("로그인 후 이용해 주세요");
          return;
        }

        boardUpdateView(boardNo);
        return;

      }

      
      const boardDeleteBtn = box.querySelector("[name=boardDeleteBtn]");

      if (e.target == boardDeleteBtn) {

        if (loginMember === null) {
          alert("로그인 후 이용해 주세요");
          return;
        }

        if (!confirm("정말 삭제하시겠습니까?")) {
          return;
        }

        boardDelte(boardNo, box);
        return;

      }


      // 모달 채우기
      updateModal(boardNo, box);

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
      updateMemberBoardList(memberNo, lastCp);
        
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
const updateMemberBoardList = (memberNo, lastCp) => {

  const obj = {
    memberNo : memberNo,
    lastCp : lastCp
  };


  fetch("/myPage/updateMemberBoardList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
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


        const boardUpdateBtn = box.querySelector("[name=boardUpdateBtn]");

        if (e.target == boardUpdateBtn) {
  
          if (loginMember === null) {
            alert("로그인 후 이용해 주세요");
            return;
          }
  
          boardUpdateView(boardNo);
          return;
  
        }
  
        
        const boardDeleteBtn = box.querySelector("[name=boardDeleteBtn]");
  
        if (e.target == boardDeleteBtn) {
  
          if (loginMember === null) {
            alert("로그인 후 이용해 주세요");
            return;
          }
  
          if (!confirm("정말 삭제하시겠습니까?")) {
            return;
          }
  
          boardDelte(boardNo, box);
          return;
  
        }



        // 모달 채우기
        updateModal(boardNo, box);
        
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


