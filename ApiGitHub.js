let responseGit;
let inpText = document.querySelector("#inp__search");
let hidenArea = document.querySelector(".main__hiden-aria");
let suggestionList = document.querySelector(".suggestion-list");
let suggestionFavorites = document.querySelector(".suggestion-favorites");
let suggestionCardCreate = document.createElement("div");
let body = document.querySelector("body");
const ACCESSTOKEN =
  "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";

suggestionCardCreate.classList.add("suggestion-card");

body.addEventListener("click", (e) => {
  hidenArea.style.display = "none";
  inpText.value = "";
});

function fetchGitRep(search) {
  if (search.length === 0) {
    hidenArea.style.display = "none";
  }
  if (search.length < 0) {
    return;
  }
  fetch(`https://api.github.com/search/repositories?q=${search}&per_page=5`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      responseGit = result.items;
      suggestionList.innerHTML = responseGit
        .map(
          ({ full_name, id }) =>
            `<li data-id="${id}" class="suggestion-list__item">${capitalizeFLetter(
              full_name
            )}</li>`
        )
        .join("");
      hidenArea.style.display = "block";
      let suggestionListItem = document.querySelectorAll(
        ".suggestion-list__item"
      );
      let selectedRepo = null;
      suggestionListItem.forEach((item) =>
        item.addEventListener("click", (e) => {
          selectedRepo = responseGit.find(
            ({ id }) => id === parseInt(e.target.dataset.id)
          );
          console.log(selectedRepo);
          let addCard =
            (suggestionCardCreate.innerHTML = `<div class="suggestion-card-container">
          <div class="suggestion-card-name">Name: ${selectedRepo.name}</div>
          <div class="suggestion-card-owner">Owner: ${selectedRepo.owner.login}</div>
          <div class="suggestion-card-stars">Stats: ${selectedRepo.stargazers_count}</div>
          <button class="suggestion-card-btn">Detete</button>
          </div>`);

          if (suggestionFavorites.innerHTML !== "") {
            suggestionFavorites.innerHTML += addCard;
          } else {
            suggestionFavorites.innerHTML = addCard;
          }

          let btns = document.querySelectorAll(".suggestion-card-btn");

          btns.forEach((e) => {
            e.addEventListener("click", (evn) => {
              evn.target.parentElement.remove();
            });
          });
        })
      );
    });
}

inpText.addEventListener("input", (e) => {
  fetchGitRep(e.target.value);
});

function capitalizeFLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
