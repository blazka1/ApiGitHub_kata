export let selectedRepo;
const suggestionFavorites = document.querySelector(".suggestion-favorites");
export function containInnerList(arr) {
  let newArr = arr.map(({ full_name, id }) => {
    const li = document.createElement("li");
    li.classList.add("suggestion-list__item");
    li.setAttribute("data-id", id);
    li.innerText = capitalizeFLetter(full_name);
    li.addEventListener("click", (e) => {
      selectedRepo = arr.find(({ id }) => id === parseInt(e.target.dataset.id));
      suggestionFavorites.appendChild(createCard(selectedRepo));
    });
    return li;
  });
  const ul = document.createElement("ul");
  ul.classList.add("suggestion-list");
  newArr.forEach((item) => ul.appendChild(item));
  return ul;
}

export function createCard(selectedRepo) {
  const btn = document.createElement("button");
  btn.classList.add("suggestion-card-btn");
  btn.innerText = "Detete";
  btn.addEventListener("click", (evn) => {
    evn.target.parentElement.remove();
  });
  const suggestionCardContainer = document.createElement("div");
  suggestionCardContainer.classList.add("suggestion-card-container");
  const div1 = document.createElement("div");
  div1.classList.add("suggestion-card-name");
  div1.innerText = `Name:  ${selectedRepo.name}`;
  suggestionCardContainer.appendChild(div1);

  const div2 = document.createElement("div");
  div2.classList.add("suggestion-card-owner");
  div2.innerText = `Owner: ${selectedRepo.owner.login}`;
  suggestionCardContainer.appendChild(div2);

  const div3 = document.createElement("div");
  div3.classList.add("suggestion-card-stars");
  div3.innerText = `Stats: ${selectedRepo.stargazers_count}`;
  suggestionCardContainer.appendChild(div3);
  suggestionCardContainer.appendChild(btn);
  return suggestionCardContainer;
}

export function capitalizeFLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
