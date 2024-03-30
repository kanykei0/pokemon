const createElements = (name, pokeId, img) => {
  const pokemon = document.createElement("a");
  pokemon.className = "pokemon";

  const pokemonImg = document.createElement("div");
  pokemonImg.className = "pokemon-img";
  pokemonImg.style.backgroundImage = `url("${img}")`;

  const pokeName = document.createElement("p");
  pokeName.className = "pokemon-name";
  pokeName.innerHTML = `#${pokeId} ${name}`;

  pokemon.append(pokemonImg, pokeName);
  pokemonsBlock.appendChild(pokemon);
};
