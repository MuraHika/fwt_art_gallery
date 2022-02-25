import React from 'react';
import "./styles.scss";
import Logo from "../../assets/Logo.svg";
import Theme from "../../assets/Theme.svg";
import Button from "../Button/index";

interface HeaderProps {
  theme?: "dark" | "light";
}

function Header({ theme } : HeaderProps) {
  return (
    <div style={{ width: "100%" }} className="sticky">
      <div className="header" >
          <Logo />
          <div className='header-buttons'>
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