const obserbFlag = document.querySelector(".obserb-flag");
let lastCp = 1;

document.addEventListener('DOMContentLoaded', () => {

  const io = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return; 
      //entry가 interscting 중이 아니라면 함수를 실행하지 않습니다.

      // observer.observe(obserbFlag);
      //observer를 등록합니다.

      lastCp++;
      //페이지를 불러오는 함수를 호출합니다.
      console.log(lastCp);

      updateBoardList(lastCp);

      

    });
  });
  
  io.observe(obserbFlag);
})

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
  .catch(err => console.error)


}

