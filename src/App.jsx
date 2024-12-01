import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./containers/Header/Header.jsx";
import Accueil from "./Pages/Accueil/Accueil.jsx";
import Pokedex from "./Pages/Pokedex/Pokedex.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </>
  );
}

export default App;
