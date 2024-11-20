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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pokémon enregistré", { selectedPokemon, comment });
  };

  return (
    <>
      <button onClick={toggleNewShasseForm}>Nouvelle Shasse</button>
      {newShasseIsOpen && (
        <form onSubmit={handleSubmit}>
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
          {selectedPokemon && (
            <div>
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
              <img
                src={selectedPokemon.sprites.front_shiny}
                alt={`${selectedPokemon.name} shiny`}
              />
            </div>
          )}
          <button type="submit">Shasser</button>
        </form>
      )}
    </>
  );
};

export default BtnNewShasse;
