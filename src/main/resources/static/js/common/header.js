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


















const sideCloseBtn = document.querySelector("#sideCloseBtn");
const sideModal = document.querySelector(".side-modal");
const profileBox = document.querySelector("[name=profileBox]");

const loginModal = document.querySelector(".login-modal");
const loginCloseBtn = document.querySelector("#loginCloseBtn");

// x 버튼 클릭시 가가
sideCloseBtn.addEventListener("click", () => {

  sideModal.classList.add("side-modal-none");

})

loginCloseBtn.addEventListener("click", () => {
  document.querySelector("#blackDisplay").classList.remove("overlay");
  loginModal.classList.add("side-modal-none");
})

profileBox.addEventListener("click", () => {
  if (loginMember === null) {

    document.querySelector("#blackDisplay").classList.toggle("overlay");
    loginModal.classList.toggle("side-modal-none");

    return;
  }

  sideModal.classList.toggle("side-modal-none");
})


