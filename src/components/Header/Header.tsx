import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Logo from "../../assets/Logo.svg";
import Theme from "../../assets/Theme.svg";
import Close from "../../assets/Close.svg";
import Button from "../Button/index";
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
    <div style={{ width: "100%", height: "100%" }} className="sticky">
      {screen.isMobile && <HeaderButtons theme={theme} classesBurger={classesBurger} setClassToBurger={setClassToBurger} />}
      <div className={`header header--${theme}`} >
          <div className={`${screen.isMobile ? "header-moblie-row" : ""}`}>
            <Logo />
            {screen.isMobile && <div onClick={() => setClassToBurger("header-buttons--burgerActive")}  className="burgermenu"><BurgerMenu /></div>}
          </div>
          {!screen.isMobile && <HeaderButtons theme={theme} classesBurger="header-buttons" setClassToBurger={setClassToBurger} />}
          {/* <div className={classesBurger}>
            {screen.isMobile && <div onClick={() => setClassToBurger("header-buttons--mobile")} className="burgermenu"><Close /></div>}
            <Button className='header-button' text={<Theme />} isPrimary={false} theme={theme} size="medium" paddings="12px"/>
            <Button text='LOG IN' isPrimary={false} theme={theme} size="large" paddings="12px 16px"/>
            <Button text='SIGN UP' isPrimary={true} theme={theme} size="large" paddings="12px 16px"/>
          </div> */}
      </div>
    </div>
  );
}

export default Header;

Header.defaultProps = {
  theme: "light",
};