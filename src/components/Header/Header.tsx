import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Logo from "../../assets/Logo.svg";
import Theme from "../../assets/Theme.svg";
import Close from "../../assets/Close.svg";
import Button from "../Button/index";
import BurgerMenu from "../../assets/burger_menu.svg";
import ResizeScreen from "../../utils/ScreenSize";

interface HeaderProps {
  theme?: "dark" | "light";
}

function Header({ theme } : HeaderProps) {
  const screen = ResizeScreen();
  const [classesBurger, setClassesBurger] = useState<string>();
  const [isBurger, setIsBurger] = useState<boolean>(false);
  useEffect(() => {
    if (screen.isMobile) {
      setClassesBurger("header-buttons--mobile");
    } else {
      setClassesBurger("header-buttons");
    }
  }, [screen]);
  return (
    <div style={{ width: "100%" }} className="sticky">
      <div className={`header header--${theme}`} >
          {!isBurger && <Logo />}
            <div className={classesBurger}>
              {screen.isMobile && !isBurger && <BurgerMenu />}
              {isBurger && <Close />}
              <Button className='header-button' text={<Theme />} isPrimary={false} theme={theme} size="medium" paddings="12px"/>
              <Button text='LOG IN' isPrimary={false} theme={theme} size="large" paddings="12px 16px"/>
              <Button text='SIGN UP' isPrimary={true} theme={theme} size="large" paddings="12px 16px"/>
            </div>
      </div>
    </div>
  );
}

export default Header;

Header.defaultProps = {
  theme: "light",
};