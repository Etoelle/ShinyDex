import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import style from "./BtnNewShasse.module.css";

const BtnNewShasse = () => {
  const [newShasseIsOpen, setNewShasseIsOpen] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [comment, setComment] = useState("");

  const toggleNewShasseForm = () => {
    setNewShasseIsOpen(!newShasseIsOpen);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1500")
      .then((response) => {
        const options = response.data.results.map((pokemon) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        }));
        setPokemonOptions(options);
      });
  }, []);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedOption.value}`)
        .then((response) => {
          setSelectedPokemon(response.data);
        });
    }
  };

  const closeForm = () => {
    setNewShasseIsOpen(false);
    setSelectedPokemon(null);
    setComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pokémon enregistré", { selectedPokemon, comment });

    const storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    const newPokemon = {
      name: selectedPokemon.name,
      comment: comment,
      encounters: 0,
    };
    const updatedPokemons = [...storedPokemons, newPokemon];
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));

    setNewShasseIsOpen(false);
    setSelectedPokemon(null);
    setComment("");
  };

  return (
    <>
      <button onClick={toggleNewShasseForm} className={style.newShasseBtn}>
        Nouvelle Shasse
      </button>
      {newShasseIsOpen && (
        <form onSubmit={handleSubmit} className={style.newShasseForm}>
          <Select
            options={pokemonOptions}
            onChange={handleSelectChange}
            isSearchable
            placeholder="Choisissez un Pokémon..."
            className={style.inputName}
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={style.spritesContainer}>
            {selectedPokemon && (
              <div className={style.sprites}>
                <img
                  src={selectedPokemon.sprites.front_shiny}
                  alt={selectedPokemon.name}
                  className={style.sprite}
                />
                <img
                  src={selectedPokemon.sprites.back_shiny}
                  alt={`${selectedPokemon.name} shiny`}
                  className={style.sprite}
                />
              </div>
            )}
          </div>
          <div className={style.btnsNewShasse}>
            <button onClick={closeForm} className={style.btnNewShasseClose}>
              Annuler
            </button>
            <button type="submit" className={style.btnNewShasseSubmit}>
              Shasser
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default BtnNewShasse;
