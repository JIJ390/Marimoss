document.addEventListener('DOMContentLoaded', () => {

  /* pwChange 아닐때 함수 실행 안함 */
  if (pageStatus !== 'memberDel') {
    return;
  }

  const memberDelBtn = document.querySelector("#memberDelBtn");
  const agreeCheckInput = document.querySelector("#agreeCheckInput");
  const memberDelPw = document.querySelector("#memberDelPw");

  memberDelBtn.addEventListener("click", () => {

    if (!agreeCheckInput.checked) {
      alert("약관을 읽고 동의해주세요");
      return;
    }

    if (memberDelPw.value.trim().length == 0) {
      alert("비밀번호를 입력해주세요");
      memberDelPw.focus();
      return;
    }

    const memberPw = memberDelPw.value.trim();

    fetch("member/memberDel", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: memberPw
    })
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("탈퇴 실패")
    })
    .then(result => {
      
      alert(result);

      if(result == "탈퇴처리 되었습니다. 그동안 marimoss를 이용해 주셔서 감사합니다") {
        location.href = "/member/logout";
      }

    })
    .catch(err => console.error)

  })

})
