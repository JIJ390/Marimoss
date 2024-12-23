document.addEventListener('DOMContentLoaded', () => {

  /* 메인 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'myPage') {
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
      updateMyBoardList(lastCp);
        
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
  
  
  /* 미리 보기 */
  const previewProflieImg = document.querySelector(".preview-proflie-img");

  // 감싸는 라벨

  // 마지막으로 선택된 파일을 저장할 배열
  let lastValidProfileFile = null;

  const updateProfilePreview = (file) => {

    const maxSize = 1024 * 1024 * 10;

    if (file.size > maxSize) {  // 파일 크기 초과 시
      alert("10 MB 이하의 이미지만 선택해 주세요");

      if (lastValidProfileFile === null) {
        profileImgInput.value = ""; // 선택 파일 삭제
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(lastValidProfileFile);
      profileImgInput.files = dataTransfer.files;
      updateProfilePreview(lastValidProfileFile); 

      return;
    }

    lastValidProfileFile = file;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", e => {
      previewProflieImg.src = e.target.result;
    })

  }


  /* 프로필input 태그 이벤트 리스너 추가 */
  const profileImgInput = document.querySelector("#profileImgInput")

  profileImgInput.addEventListener("change", e => {
    const file = e.target.files[0];

    console.log(file);

    if (file === undefined) {

      if (lastValidProfileFile === null) return;

      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(lastValidProfileFile);

      profileImgInput.files = dataTransfer.files;

      updateProfilePreview(lastValidProfileFile);

      return;
    }

    updateProfilePreview(file);
  })




  /* 테마 미리 보기 */
  const previewThemeImg = document.querySelector(".preview-theme-img");

  // 감싸는 라벨

  // 마지막으로 선택된 파일을 저장할 배열
  let lastValidThemeFile = null;

  const updateThemePreview = (file) => {

    const maxSize = 1024 * 1024 * 10;

    if (file.size > maxSize) {  // 파일 크기 초과 시
      alert("10 MB 이하의 이미지만 선택해 주세요");

      if (lastValidThemeFile === null) {
        previewThemeImg.value = ""; // 선택 파일 삭제
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(lastValidThemeFile);
      previewThemeImg.files = dataTransfer.files;
      updateThemePreview(lastValidThemeFile);

      return;
    }

    lastValidThemeFile = file;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", e => {
      previewThemeImg.src = e.target.result;
    })

  }


  /* 프로필input 태그 이벤트 리스너 추가 */
  const themeImgInput = document.querySelector("#themeImgInput")

  themeImgInput.addEventListener("change", e => {
    const file = e.target.files[0];

    console.log(file);

    if (file === undefined) {

      if (lastValidThemeFile === null) return;

      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(lastValidThemeFile);

      themeImgInput.files = dataTransfer.files;

      updateThemePreview(lastValidThemeFile);

      return;
    }

    updateThemePreview(file);
  })



  // themeImgUpdateBtn : 테마 변경 버튼 이벤트 부여
  const themeImgUpdateBtn = document.querySelector("#themeImgUpdateBtn");

  themeImgUpdateBtn.addEventListener("click", () => {

    if (lastValidThemeFile == null) {
      alert("테마 이미지를 선택해 주세요");
      return;
    }

    /* 사진을 비동기로 넘기기 위해 formData 사용 */
    const file = themeImgInput.files[0]; // 선택한 파일
    const formData = new FormData();

    formData.append('theme', file);

    fetch("/myPage/themeUpdate", {
      method: "PUT",
      body: formData
    })
    .then(resp => {
      if (resp.ok) return resp.text();
    })
    .then(themeUrl => {
      
      const myPageTheme = document.querySelector("#myPageTheme");
      myPageTheme.src = themeUrl;

      alert("테마 이미지가 수정되었습니다");
      
    })
    .catch(err => console.error(err));
  
  })





  // themeImgUpdateBtn : 테마 변경 버튼 이벤트 부여
  const profileImgUpdateBtn = document.querySelector("#profileImgUpdateBtn");

  profileImgUpdateBtn.addEventListener("click", () => {

    if (lastValidProfileFile == null) {
      alert("프로필 이미지를 선택해 주세요");
      return;
    }

    /* 사진을 비동기로 넘기기 위해 formData 사용 */
    const file = profileImgInput.files[0]; // 선택한 파일
    const formData = new FormData();

    formData.append('profileImg', file);

    fetch("/myPage/profileImgUpdate", {
      method: "PUT",
      body: formData
    })
    .then(resp => {
      if (resp.ok) return resp.text();
    })
    .then(profileUrl => {
      
      const profileImg = document.querySelector("#profileImg");
      profileImg.src = profileUrl;

      alert("프로필 이미지가 수정되었습니다");
      
    })
    .catch(err => console.error(err));
  
  })

  const myPageModal = document.querySelector(".myPage-modal");
  const profileChangeBtn = document.querySelector(".profile-change-btn");
  const myPageModalCancleBtn = document.querySelector("#myPageModalCancleBtn");

  profileChangeBtn.addEventListener("click", () => {
    myPageModal.style = "z-index: 100";
  })

  myPageModalCancleBtn.addEventListener("click", () => {
    myPageModal.style = "z-index: -100";
  })


})

// 스크롤 내릴 시 작동하는 함수
const updateMyBoardList = (lastCp) => {

  fetch("/updateMyBoardList", {
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

