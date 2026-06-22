window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".video-card");
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".close");
  const player = document.querySelector("#player");
  const title = document.querySelector("#title");
  const desc = document.querySelector("#desc");
  const period = document.querySelector("#period");
  const role = document.querySelector("#role");
  const skill = document.querySelector("#skill1");
  const feature = document.querySelector("#feature");
  const solve = document.querySelector("#solve");
  const goal = document.querySelector("#goal");
  const contentTitle = document.querySelector("#content-title");
  // console.log(cards);
  // console.log(contentTitle);

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modal.classList.add("active");

      // 모달 iframe에 영상 적용
      player.src = card.dataset.video + "?autoplay=1";

      title.textContent = card.dataset.title;
      desc.textContent = card.dataset.desc;
      period.textContent = card.dataset.period;
      role.textContent = card.dataset.role;
      skill.textContent = card.dataset.skill;
      feature.textContent = card.dataset.feature;
      solve.textContent = card.dataset.solve;
      goal.textContent = card.dataset.goal;

      document.body.style.overflow = "hidden";
    });
  });
  // modal close클릭시
  close.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // 스크롤 복구
  });
});
