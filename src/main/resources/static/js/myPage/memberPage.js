document.addEventListener('DOMContentLoaded', () => {

  /* 메인 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'memberPage') {
    return;
  }

  const memberNo = document.querySelector("#myPageMemberNickname").getAttribute("data-value");


  const pofileFollowBtn = document.querySelector("[name=pofileFollowBtn]");

  let followCheck = 0;

  if (pofileFollowBtn != null) {
    followCheck =   pofileFollowBtn.getAttribute("data-value");
  }  
  
  pofileFollowBtn?.addEventListener("mouseover", () => {
    if (followCheck == 1) {
      pofileFollowBtn.innerText = "취소 X";
    }

  })

  pofileFollowBtn?.addEventListener("mouseout", () => {
    if (followCheck == 1) {
      pofileFollowBtn.innerText = "팔로우";
    }

  })

  pofileFollowBtn?.addEventListener("click", () => {

    fetch("member/followChange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: memberNo
    })
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("변경 실패")
    })
    .then(result => {
  
      // 결과에 따라 변경
      if (result == 'unfollow') {
  
        followCheck = 0;
        pofileFollowBtn.classList.remove("follow");
        pofileFollowBtn.innerText = '팔로우';
      }
  
      if (result == 'follow') {

        followCheck = 1;
        pofileFollowBtn.classList.add("follow");
        pofileFollowBtn.innerText = '취소 X';
  
      }
    })

  })






  const followerBtn = document.querySelector("#followerBtn");
  const followeeBtn = document.querySelector("#followeeBtn");

  const followerContainer = document.querySelector("[name=followerContainer]");
  const followeeContainer = document.querySelector("[name=followeeContainer]");

  followerBtn.addEventListener("click", () => {
    followerContainer.classList.remove("follow-display");
    followeeContainer.classList.add("follow-display");
    followerBtn.classList.add("checked-div");
    followeeBtn.classList.remove("checked-div");
  })


  followeeBtn.addEventListener("click", () => {
    followerContainer.classList.add("follow-display");
    followeeContainer.classList.remove("follow-display");
    followeeBtn.classList.add("checked-div");
    followerBtn.classList.remove("checked-div");
  })

  const followerEtcArea = followerContainer.querySelectorAll(".follower-box-etc-area");

  // 팔로워
  followerEtcArea.forEach(box => {
    const etcBtn = box.querySelector("[name=etcBtn]");
    const modalFollowerMenu = box.querySelector(".modal-follower-menu");

    const followerNo = box.getAttribute("data-value");

    etcBtn.addEventListener("click", () => {

      // 만약 클릭 시 해당 모달이 활성화되지 않은 상태인 경우
      if (modalFollowerMenu.classList.contains("modal-follower-menu-close")) {

        const modalFollowerMenus = followerContainer.querySelectorAll(".modal-follower-menu");
        // 모든 메뉴 종료
        modalFollowerMenus.forEach(menu => {
          menu.classList.add("modal-follower-menu-close");
        })
      }

      modalFollowerMenu.classList.toggle("modal-follower-menu-close");
    })



    //// 회원 페이지 이동
    const memberPage = modalFollowerMenu.querySelector("[name=memberPage]");

    memberPage.addEventListener("click", () => {
      fetch("/myPage/memberPageView?memberNo=" + followerNo)
        .then(resp => {
          if (resp.ok) return resp.text();
          throw new Error("실패")
        })
        .then(html => {
          pageStatus = 'memberPage';

          document.querySelector("#blackDisplay").classList.remove("overlay");

          main.innerHTML = html;
          window.scrollTo({ top: 0 });

          // 임의로 이벤트 발생
          const domContentLoadedEvent = new Event('DOMContentLoaded');
          document.dispatchEvent(domContentLoadedEvent);
        })
        .catch(err => console.error);

    })
  

  })




  const followeeEtcArea = followeeContainer.querySelectorAll(".follower-box-etc-area");

  // 팔로잉
  followeeEtcArea.forEach(box => {
    const etcBtn = box.querySelector("[name=etcBtn]");
    const modalFollowerMenu = box.querySelector(".modal-follower-menu");

    const followeeNo = box.getAttribute("data-value");

    etcBtn.addEventListener("click", () => {

      // 만약 클릭 시 해당 모달이 활성화되지 않은 상태인 경우
      if (modalFollowerMenu.classList.contains("modal-follower-menu-close")) {

        const modalFollowerMenus = followerContainer.querySelectorAll(".modal-follower-menu");
        // 모든 메뉴 종료
        modalFollowerMenus.forEach(menu => {
          menu.classList.add("modal-follower-menu-close");
        })
      }

      modalFollowerMenu.classList.toggle("modal-follower-menu-close");
    })



    //// 회원 페이지 이동
    const memberPage = modalFollowerMenu.querySelector("[name=memberPage]");

    memberPage.addEventListener("click", () => {
      fetch("/myPage/memberPageView?memberNo=" + followeeNo)
        .then(resp => {
          if (resp.ok) return resp.text();
          throw new Error("실패")
        })
        .then(html => {
          pageStatus = 'memberPage';

          document.querySelector("#blackDisplay").classList.remove("overlay");

          main.innerHTML = html;
          window.scrollTo({ top: 0 });

          // 임의로 이벤트 발생
          const domContentLoadedEvent = new Event('DOMContentLoaded');
          document.dispatchEvent(domContentLoadedEvent);
        })
        .catch(err => console.error);
    })






  })





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


