import {
  containInnerList,
  createCard,
  capitalizeFLetter,
  selectedRepo,
} from "./functions.js";

let responseGit;
const inpText = document.querySelector("#inp__search");
const hidenArea = document.querySelector(".main__hiden-aria");
const body = document.querySelector("body");

let inDebounce;
const debounce = (func, delay) => {
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

body.addEventListener("click", (e) => {
  hidenArea.classList.add("hide");
  hidenArea.classList.remove("show");
  inpText.value = "";
});

function fetchGitRep() {
  fetch(
    `https://api.github.com/search/repositories?q=${inpText.value}&per_page=5`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      responseGit = result.items;
      hidenArea.textContent = "";
      hidenArea.appendChild(containInnerList(responseGit));
      hidenArea.classList.add("show");
      hidenArea.classList.remove("hide");
    });
}

inpText.addEventListener("input", debounce(fetchGitRep, 2000));
