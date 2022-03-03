import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Logo from "../../assets/Logo.svg";
import BurgerMenu from "../../assets/burger_menu.svg";
import ResizeScreen from "../../utils/ScreenSize";
import HeaderButtons from "../HeaderButtons/index";

interface HeaderProps {
  theme?: "dark" | "light";
}

function Header({ theme } : HeaderProps) {
  const screen = ResizeScreen();
  const [classesBurger, setClassesBurger] = useState<string>("");
  const [isBurger, setIsBurger] = useState<boolean>(false);
  useEffect(() => {
    console.log("ddd");
    if (screen.isMobile) {
      if (!isBurger){
        setClassesBurger("header-buttons--mobile");
      } else {
        setClassesBurger("header-buttons--burgerActive");
      } 
    } else {
      setClassesBurger("header-buttons");
    }
  }, [screen]);

  const setClassToBurger = (burgerClass : string) => {
    console.log(burgerClass);
    setIsBurger(!isBurger);
    setClassesBurger(burgerClass);
  };

  return (
    <div style={{ width: "100%" }} className={`sticky ${isBurger ? "sticky-burger" : ""}`}>
      {screen.isMobile && <HeaderButtons theme={theme} classesBurger={classesBurger} setClassToBurger={setClassToBurger} />}
      <div className={`header header--${theme}`} >
          <div className={`${screen.isMobile ? "header-moblie-row" : ""}`}>
            <div className='logo'><Logo /></div>
            {screen.isMobile && <div onClick={() => setClassToBurger("header-buttons--burgerActive")}  className="burgermenu"><BurgerMenu /></div>}
          </div>
          {!screen.isMobile && <HeaderButtons theme={theme} classesBurger="header-buttons" setClassToBurger={setClassToBurger} />}
      </div>
    </div>
  );
}

export default Header;

Header.defaultProps = {
  theme: "light",
};