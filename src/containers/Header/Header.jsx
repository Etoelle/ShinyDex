import style from "./Header.module.css";
import logo from "../../img/LogoAsset4.png";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu.jsx";

const Header = () => {
  return (
    <div className={style.header}>
      <img src={logo} alt="Logo" className={style.logo} />
      <BurgerMenu />
    </div>
  );
};

export default Header;
