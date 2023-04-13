function c(q) {
  console.log(q);
}
const input = document.querySelector(".search__input");
const cards = document.querySelector(".cards");
const debouncedOnChangeInput = debounce(onChangeInput, 500);

input.addEventListener("input", (e) => debouncedOnChangeInput(e));
cards.addEventListener("click", onClickCards);

function onClickCards(e) {
  if (e.target.classList.contains("card__delete")) {
    e.target.closest(".card").remove();
  }
}

function debounce(fn, debounceTime) {
  let timeId;

  return function (...args) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
}

function onChangeInput(e) {
  addDropdownRepos(e.target.value);
}

async function addDropdownRepos(value) {
  const repos = await getRepos(value);

  deleteAllRepos();

  for (let repo of repos) {
    addDropdownItem(repo);
  }
}

function addDropdownItem(repo) {
  const dropdown = document.querySelector(".dropdown");
  const tmpl = document.querySelector("#dropdown-item");
  const clone = tmpl.content.cloneNode(true);
  const dropdownItem = clone.querySelector(".dropdown__item");

  dropdownItem.textContent = repo.name;
  dropdownItem.addEventListener("click", (e) => addCard(repo));

  dropdown.append(dropdownItem);
}

function deleteAllRepos() {
  const repos = document.querySelectorAll(".dropdown__item");

  for (let repo of repos) {
    repo.remove();
  }
}

function addCard(repo) {
  const tmpl = document.querySelector("#tmpl-card");
  const clone = tmpl.content.cloneNode(true);
  const card = clone.querySelector(".card");
  const fieldName = card.querySelector(".card__name");
  const fieldOwner = card.querySelector(".card__owner");
  const fieldStars = card.querySelector(".card__stars");

  fieldName.textContent = `Name: ${repo.name}`;
  fieldOwner.textContent = `Owner: ${repo.owner.login}`;
  fieldStars.textContent = `Stars: ${repo.stargazers_count}`;

  cards.prepend(card);
  input.value = "";
  deleteAllRepos();
}

function showError(text) {
  const errMessage = document.querySelector(".error-message");
  errMessage.textContent = text;
  errMessage.classList.add("error-message--show");
  setTimeout(() => errMessage.classList.remove("error-message--show"), 5000);
}

async function getRepos(word) {
  let repos = [];
  try {
    if (word) {
      const responce = await fetch(
        `https://api.github.com/search/repositories?q=${word}&per_page=5`
      );

      const data = await responce.json();

      if (responce.ok) {
        repos = data.items;
      } else {
        throw new Error(data.message);
      }
    }
  } catch (error) {
    showError(error);
  }

  return repos;
}
