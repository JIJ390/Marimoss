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