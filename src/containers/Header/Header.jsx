import React from "react";
import logo from "../../img/LogoAsset4.png";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu.jsx";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <div className={style.menuHeader}>
      <img src={logo} alt="Logo" />
      <BurgerMenu />
    </div>
  );
};
