document.addEventListener("DOMContentLoaded", () => {
  /* 임의 이벤트 발동 시 마다 초기화 */

  const imgInput = document.querySelector("[name=imgInput]");
  const boardTitle = document.querySelector("[name=boardTitle]");
  const boardContent = document.querySelector("[name=boardContent]");
  const insertBtn = document.querySelector("#insertBtn");

  /* 등록 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'boardInsertPage') {
    return;
  }



  /* 돔 실행 후 모든 메서드가 실행되도록 내부에 작성 */
  /* 등록 버튼 클릭 시 유효성 검사와 함께 등록 */
  insertBtn?.addEventListener("click", () => {

    if(imgInput.value.trim().length === 0) {
      alert("등록할 작품을 선택해 주세요");
      return;
    }

    if(boardTitle.value.trim().length === 0) {
      alert("제목을 작성해 주세요");
      return;
    }

    /* 사진을 비동기로 넘기기 위해 formData 사용 */
    const file = imgInput.files[0]; // 선택한 파일
    const formData = new FormData();

    formData.append('paint', file); 
    formData.append('boardTitle', boardTitle.value.trim());
    formData.append('boardContent', boardContent.value.trim());

    fetch("/board/insert", {
      method : "POST",
      body : formData
    })
    .then(resp => {
      if (resp.ok) return resp.text();
    })
    .then(result => {
      if (result === '1') {
        alert("등록 되었습니다");


        // 비우기

        previewImg.src = "";

        previewImgBox.classList.add("preview-img-box");
        previewImgBox.classList.remove("preview-img-box2");

        previewImgBoxNotice.style = "display : flex";

        imgInput.value = null;
        boardTitle.value = '';
        boardContent.value = '';
      }
      
      else {
        alert("ERROR : 등록 오류");
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



