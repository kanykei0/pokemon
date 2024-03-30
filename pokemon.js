const pokemonsBlock = document.getElementById("pokemons-block");
const previous = document.getElementById("prev");
const next = document.getElementById("next");

const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
let CURRENT_PAGE = POKE_URL;

const request = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error("Error: " + response.status);
};

const createData = async (result = null) => {
  try {
    const generation = async () => {
      for (item of result.results) {
        itemResult = await request(item.url);
        createElements(
          item.name,
          itemResult.id,
          itemResult.sprites.front_default
        );
      }
    };
    if (result === null) {
      result = await request(POKE_URL);
      generation();
    } else {
      generation();
    }
  } catch (e) {
    alert(e.message);
  }
};
createData();

const pageNavigationTo = async (page) => {
  const result = await request(CURRENT_PAGE);
  let direction;

  if (page === "next") {
    if (result.next === null) {
      return;
    }
    direction = result.next;
  } else if (page === "previous") {
    if (result.previous === null) {
      return;
    }
    direction = result.previous;
  }
  pokemonsBlock.innerHTML = "";
  const pageResult = await request(direction);
  CURRENT_PAGE = direction;
  createData(pageResult);
};

next.addEventListener("click", (event) => {
  event.preventDefault();
  pageNavigationTo("next");
});

previous.addEventListener("click", (event) => {
  event.preventDefault();
  pageNavigationTo("previous");
});
