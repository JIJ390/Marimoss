document.addEventListener('DOMContentLoaded', () => {

  console.log(pageStatus);

  /* 랭크 페이지 아닐때 함수 실행 안함 */
  if (pageStatus !== 'rankPage') {
    return;
  }

  const rankStatus = obserbFlag.getAttribute("data-value2");

  const allTime = document.querySelector("[name=allTime]");
  const monthly = document.querySelector("[name=monthly]");
  const weekly = document.querySelector("[name=weekly]");

  if (rankStatus === 'allTime') {
    allTime.classList.add("checked-div");
  }

  if (rankStatus === 'monthly') {
    monthly.classList.add("checked-div");
  }

  if (rankStatus === 'weekly') {
    weekly.classList.add("checked-div");
  }



  allTime.addEventListener("click", () => {


    fetch("/rankView?rankTime=allTime")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'rankPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);


  })

  monthly.addEventListener("click", () => {

    fetch("/rankView?rankTime=monthly")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'rankPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});

      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);
  })

  weekly.addEventListener("click", () => {


    fetch("/rankView?rankTime=weekly")
    .then(resp => {
      if (resp.ok) return resp.text();
      throw new Error("실패")
    })
    .then(html => {
      pageStatus = 'rankPage';

      main.innerHTML = html;
      window.scrollTo({top: 0});


      // 임의로 이벤트 발생
      const domContentLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domContentLoadedEvent);
    })
    .catch(err => console.error);

  })

})