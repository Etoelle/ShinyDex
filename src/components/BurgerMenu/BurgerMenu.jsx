import { useEffect, useRef, useState } from "react";
import style from "./BurgerMenu.module.css";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerMenuRef = useRef(null);

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      burgerMenuRef.current &&
      !burgerMenuRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={style.burgerMenu} ref={burgerMenuRef}>
      <button className={style.burgerMenuBtn} onClick={toggleBurgerMenu}>
        ☰
      </button>
      {isOpen && (
        <nav className={style.burgerMenuOpened}>
          <ul>
            <li>Accueil</li>
            <li>Collection</li>
            <li>Pokédex</li>
            <li>
              <a
                href="https://www.pokebip.com/page/jeuxvideo/dossier_shasse/index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guide Pokébip
              </a>
            </li>
            <li>Contact</li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
