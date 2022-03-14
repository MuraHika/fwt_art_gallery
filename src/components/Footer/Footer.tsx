import React from 'react';
import "./styles.scss";
import Link from "../Link/index";
import VK from "../../assets/Vk.svg";
import Facebook from "../../assets/Facebook.svg";
import Insta from "../../assets/Instagram.svg";

interface FooterProps {
  theme?: "dark" | "light";
}

function Footer({ theme } : FooterProps) {
  return (
    <div style={{ width: "100%" }}>
      <div className={`footer footer--${theme}`} >
        <div className='footer_top_line' />
        <div className='footer-row'>
          <div className='footer-title'>
            <span className={`footer-title__span--${theme}`}>Проект реализован в рамках стажировки </span>
            <span className={`footer-title__span--${theme}`}>для Frontend-разработчиков от компании <Link text='Framework Team' url='https://framework.team/' theme={theme}/></span>  
          </div>
          <div className={`icons icons--${theme}`}>
            <a href="https://www.facebook.com/framework.team">
              <Facebook />
            </a>
            <a href="https://vk.com/frameworkteam">
              <VK />
            </a>
            <a className="insta_logo" href="https://www.instagram.com/framework.team/">
              <Insta />
            </a>
          </div>
        </div>
        <div className='footer-row'>
          <p className={`footer-p--${theme}`}>
            Сажникова Ольга, 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

Footer.defaultProps = {
  theme: "light",
};