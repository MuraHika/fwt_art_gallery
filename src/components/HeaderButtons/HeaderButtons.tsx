import React from 'react';
import "./styles.scss";
import Theme from "../../assets/Theme.svg";
import Close from "../../assets/Close.svg";
import Button from "../Button/index";
import ResizeScreen from "../../utils/ScreenSize";
import { useAppDispatch } from "../../hooks/useToolkit";
import { setTheme } from "../../slices/artistSlice";

interface HeaderButtonsProps {
  theme?: "dark" | "light";
  classesBurger: string;
  setClassToBurger: (burgerClass: string) => void;
}

function HeaderButtons({ theme, classesBurger, setClassToBurger } : HeaderButtonsProps) {
  const screen = ResizeScreen();
  const dispatch = useAppDispatch();

  const setNewTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  return (
    <div className={classesBurger}>
      {screen.isMobile && <div onClick={() => setClassToBurger("header-buttons--mobile")} className="close_button"><Close /></div>}
      <Button className='header-button' text={<Theme />} isPrimary={false} theme={theme} size="medium" paddings="12px" onClick={() => setNewTheme()}/>
      <Button text='LOG IN' isPrimary={false} theme={theme} size="large" paddings="12px 16px"/>
      <Button text='SIGN UP' isPrimary={true} theme={theme} size="large" paddings="12px 16px"/>
    </div>
  );
}

export default HeaderButtons;

HeaderButtons.defaultProps = {
  theme: "light",
};