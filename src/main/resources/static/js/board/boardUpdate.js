document.addEventListener("DOMContentLoaded", () => {
  /* 임의 이벤트 발동 시 마다 초기화 */

  /* 같은 페이지 형식을 공유하므로 이름 좀 다름 */
  const imgInput = document.querySelector("[name=imgInput]");
  const boardTitle = document.querySelector("[name=boardTitle]");
  const boardContent = document.querySelector("[name=boardContent]");
  const updateBtn = document.querySelector("#insertBtn");


  /* 등록 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'boardUpdatePage') {
    return;
  }


  /* 돔 실행 후 모든 메서드가 실행되도록 내부에 작성 */
  /* 등록 버튼 클릭 시 유효성 검사와 함께 등록 */
  updateBtn?.addEventListener("click", () => {

    const boardUpdateContainer = document.querySelector(".board-insert-container");
    const boardNo = boardUpdateContainer.getAttribute("data-value");

    if(boardTitle.value.trim().length === 0) {
      alert("제목을 작성해 주세요");
      return;
    }

    /* 사진을 비동기로 넘기기 위해 formData 사용 */
    const file = imgInput.files[0]; // 선택한 파일
    const formData = new FormData();

    // 파일이 선택된 경우에만 추가
    formData.append('paint', file); 
    formData.append('boardNo', boardNo); 
    formData.append('boardTitle', boardTitle.value.trim());
    formData.append('boardContent', boardContent.value.trim());

    fetch("/board/update", {
      method : "PUT",
      body : formData
    })
    .then(resp => {
      if (resp.ok) return resp.text();
    })
    .then(result => {
      if (result === '1') {


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
          
          alert("수정되었습니다");
        })
        .catch(err => console.error);
      
      }
      
      else {
        alert("ERROR : 수정 오류");
      }
    })
    .catch(err => console.error(err));

  })






  /* 미리 보기 */
  const previewImg = document.querySelector(".preview-img");

  // 감싸는 라벨
  const previewImgBox = document.querySelector(".preview-img-box")
  const previewImgBoxNotice = document.querySelector(".preview-img-box-notice");

  // 마지막으로 선택된 파일을 저장할 배열
  let lastValidFile = null;

  const updatePreview = (file) => {

    const maxSize = 1024 * 1024 * 10;

    if (file.size > maxSize) {  // 파일 크기 초과 시
      alert("10 MB 이하의 이미지만 선택해 주세요");

      if (lastValidFile === null) {
        imgInput.value = ""; // 선택 파일 삭제
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(lastValidFile);
      inputImage.files = dataTransfer.files;
      updatePreview(lastValidFile); 

      return;
    }

    lastValidFile = file;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", e => {
      previewImg.src = e.target.result;
      previewImg.style.visibility="visible"
    })

    previewImgBox.classList.remove("preview-img-box");
    previewImgBox.classList.add("preview-img-box2");

    previewImgBoxNotice.style = "display : none";

  }


  /* input 태그 이벤트 리스너 추가 */

  imgInput.addEventListener("change", e => {
    const file = e.target.files[0];

    console.log(file);

    if (file === undefined) {

      if (lastValidFile === null) return;

      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(lastValidFile);

      imgInput.files = dataTransfer.files;

      updatePreview(lastValidFile);

      return;
    }

    console.log(file);

    updatePreview(file);
  })


})



