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

  const incrementEncounter = (index) => {
    const updatedPokemons = [...pokemons];
    updatedPokemons[index].encounters += 1;
    setPokemons(updatedPokemons);
    updateLocalStorage(updatedPokemons);
  };

  const decrementEncounter = (index) => {
    const updatedPokemons = [...pokemons];
    if (updatedPokemons[index].encounters > 0) {
      updatedPokemons[index].encounters -= 1;
      setPokemons(updatedPokemons);
      updateLocalStorage(updatedPokemons);
    }
  };

  const capturePokemon = (index) => {
    const updatedPokemons = [...pokemons];
    updatedPokemons[index].captured = true;
    setPokemons(updatedPokemons);
    updateLocalStorage(updatedPokemons);
  };

  return (
    <div className={style.counterContainer}>
      {pokemons
        .filter((pokemon) => !pokemon.captured)
        .map((pokemon, index) => (
          <div key={index} className={style.pokemonCard}>
            <img
              src={sprites[pokemon.name]}
              alt={pokemon.name}
              className={style.pokemonCardSprite}
            />
            <p className={style.pokemonCardTitle}>{pokemon.encounters}</p>
            <p className={style.pokemonCardComment}>{pokemon.comment}</p>
            <div className={style.pokemonCardBtns}>
              <button
                onClick={() => decrementEncounter(index)}
                className={style.pokemonCardLess}
              >
                -
              </button>
              <button
                onClick={() => incrementEncounter(index)}
                className={style.pokemonCardMore}
              >
                +
              </button>
            </div>
            <button
              onClick={() => capturePokemon(index)}
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
