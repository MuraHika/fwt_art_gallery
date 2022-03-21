import React from 'react';
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import Theme from "../../assets/Theme.svg";
import Close from "../../assets/Close.svg";
import Button from "../Button/index";
import ResizeScreen from "../../utils/ScreenSize";
import { useAppDispatch, useAppSelector } from "../../hooks/useToolkit";
import { setTheme, setLogin } from "../../slices/artistSlice";

interface HeaderButtonsProps {
  theme?: "dark" | "light";
  classesBurger: string;
  setClassToBurger: (burgerClass: string) => void;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>; 
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderButtons({ theme, classesBurger, setClassToBurger, setRegister, setAuth } : HeaderButtonsProps) {
  const screen = ResizeScreen();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.artists.isLogin);
  const navigate = useNavigate();

  const setNewTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  const onNavigateTo = () => {
    if (isLogin) {
      dispatch(setLogin(false));
      navigate("/");
    } else {
      dispatch(setLogin(true));
      navigate("/artist");
    }
  };

  const openRegisterForm = () => {
    setRegister(true);
  };

  const openAuthForm = () => {
    setAuth(true);
  };

  return (
    <div className={classesBurger}>
      {screen.isMobile && <div onClick={() => setClassToBurger("header-buttons--mobile")} className="close_button"><Close /></div>}
      <Button className='header-button' aria-label='theme' text={<Theme />} isPrimary={false} theme={theme} size="medium" paddings="12px" onClick={() => setNewTheme()}/>
      {!isLogin && <Button text='LOG IN' isPrimary={false} theme={theme} size="large" paddings="12px 16px" onClick={() => openAuthForm()} />}
      {!isLogin && <Button text='SIGN UP' isPrimary={true} theme={theme} size="large" paddings="12px 16px" onClick={() => openRegisterForm()} />}
      {isLogin && <Button text="LOG OUT" isPrimary={false} theme={theme} size="large" paddings='12px 16px' onClick={() => onNavigateTo()} /> }
    </div>
  );
}

export default HeaderButtons;

HeaderButtons.defaultProps = {
  theme: "light",
};