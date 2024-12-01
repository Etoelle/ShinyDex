import { useEffect, useRef, useState } from "react";
import style from "./BurgerMenu.module.css";
import { Link, useLocation } from "react-router-dom";

const BurgerMenu = () => {
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState(false);
  const burgerMenuRef = useRef(null);
  const location = useLocation();

  const toggleBurgerMenu = () => {
    setBurgerMenuIsOpen(!burgerMenuIsOpen);
  };

  const handleClickOutside = (event) => {
    if (
      burgerMenuRef.current &&
      !burgerMenuRef.current.contains(event.target)
    ) {
      setBurgerMenuIsOpen(false);
    }
  };

  useEffect(() => {
    if (burgerMenuIsOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [burgerMenuIsOpen]);

  useEffect(() => {
    setBurgerMenuIsOpen(false);
  }, [location]);

  return (
    <div className={style.burgerMenu} ref={burgerMenuRef}>
      <button className={style.burgerMenuBtn} onClick={toggleBurgerMenu}>
        ☰
      </button>
      {burgerMenuIsOpen && (
        <nav className={style.burgerMenuOpened}>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {/* <li>Collection</li> */}
            <li>
              <Link to="/pokedex">Pokédex</Link>
            </li>
            <li>
              <a
                href="https://www.pokebip.com/page/jeuxvideo/dossier_shasse/index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guide Pokébip
              </a>
            </li>
            {/* <li>Contact</li> */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
