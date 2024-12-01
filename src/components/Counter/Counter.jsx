import { useEffect, useState } from "react";
import style from "./Counter.module.css";
import axios from "axios";

const Counter = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sprites, setSprites] = useState({});

  useEffect(() => {
    const fetchSprites = async () => {
      const storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
      const spritesData = {};
      for (let pokemon of storedPokemons) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          spritesData[pokemon.name] = response.data.sprites.front_shiny;
        } catch (error) {
          console.error(
            `Erreur lors de la récupération du sprite pour ${pokemon.name}`,
            error
          );
        }
      }
      setPokemons(storedPokemons);
      setSprites(spritesData);
    };
    fetchSprites();
  }, []);

  const updateLocalStorage = (updatedPokemons) => {
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
  };

  const incrementEncounter = (id) => {
    const updatedPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return { ...pokemon, encounters: pokemon.encounters + 1 };
      }
      return pokemon;
    });
    setPokemons(updatedPokemons);
    updateLocalStorage(updatedPokemons);
  };

  const decrementEncounter = (id) => {
    const updatedPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id && pokemon.encounters > 0) {
        return { ...pokemon, encounters: pokemon.encounters - 1 };
      }
      return pokemon;
    });
    setPokemons(updatedPokemons);
    updateLocalStorage(updatedPokemons);
  };

  const capturePokemon = (id) => {
    const updatedPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return { ...pokemon, captured: true };
      }
      return pokemon;
    });
    setPokemons(updatedPokemons);
    updateLocalStorage(updatedPokemons);
  };

  return (
    <div className={style.counterContainer}>
      {pokemons
        .filter((pokemon) => !pokemon.captured)
        .map((pokemon) => (
          <div key={pokemon.id} className={style.pokemonCard}>
            <img
              src={sprites[pokemon.name]}
              alt={pokemon.name}
              className={style.pokemonCardSprite}
            />
            <p className={style.pokemonCardTitle}>{pokemon.encounters}</p>
            <p className={style.pokemonCardComment}>{pokemon.comment}</p>
            <div className={style.pokemonCardBtns}>
              <button
                onClick={() => decrementEncounter(pokemon.id)}
                className={style.pokemonCardLess}
              >
                -
              </button>
              <button
                onClick={() => incrementEncounter(pokemon.id)}
                className={style.pokemonCardMore}
              >
                +
              </button>
            </div>
            <button
              onClick={() => capturePokemon(pokemon.id)}
              className={style.pokemonCardCaptured}
            >
              Capturé
            </button>
          </div>
        ))}
    </div>
  );
};

export default Counter;
