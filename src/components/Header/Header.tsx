import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Logo from "../../assets/Logo.svg";
import BurgerMenu from "../../assets/burger_menu.svg";
import ResizeScreen from "../../utils/ScreenSize";
import HeaderButtons from "../HeaderButtons/index";
import ModalRegister from "../ModalForms/ModalRegister";
import ModalAuth from "../ModalForms/ModalAuth";

interface HeaderProps {
  theme?: "dark" | "light";
}

function Header({ theme } : HeaderProps) {
  const screen = ResizeScreen();
  const [classesBurger, setClassesBurger] = useState<string>("");
  const [isBurger, setIsBurger] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (screen.isMobile) {
      setClassesBurger(!isBurger ? "header-buttons--mobile" : "header-buttons--burgerActive");
    } else {
      setClassesBurger("header-buttons");
    }
  }, [screen]);

  const setClassToBurger = (burgerClass : string) => {
    setIsBurger(!isBurger);
    setClassesBurger(burgerClass);
  };

  return (
    <div style={{ width: "100%" }} className={`sticky ${isBurger ? "sticky-burger" : ""}`}>

      {isAuth && <ModalAuth setRegister={setIsRegister} setAuth={setIsAuth}/>}
      {isRegister && <ModalRegister setRegister={setIsRegister} setAuth={setIsAuth}/>}
      {screen.isMobile && <HeaderButtons theme={theme} classesBurger={classesBurger} setClassToBurger={setClassToBurger} setRegister={setIsRegister} setAuth={setIsAuth}/>}
      <div className={`header header--${theme}`} >
          <div className={`${screen.isMobile ? "header-moblie-row" : ""}`}>
            <div className='logo'><Logo /></div>
            {screen.isMobile && <div onClick={() => setClassToBurger(`header-buttons--burgerActive header-buttons--${theme}`)}  className="burgermenu"><BurgerMenu /></div>}
          </div>
          {!screen.isMobile && <HeaderButtons theme={theme} classesBurger="header-buttons" setClassToBurger={setClassToBurger} setRegister={setIsRegister} setAuth={setIsAuth}/>}
      </div>
    </div>
  );
}

export default Header;

Header.defaultProps = {
  theme: "light",
};