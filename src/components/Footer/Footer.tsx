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
      <div className="footer" >
          <div className='footer-row'>
            <div className='left_column'>
              <span className={`theme-${theme}`}>Проект реализован в рамках стажировки </span>
              <span className={`theme-${theme}`}>для Frontend-разработчиков от компании <Link text='Framework Team' url='https://framework.team/' theme={theme}/></span>  
            </div>
            <div className='right_column'>
              <div style={{width: "50px", height: "50px"}}>
                <VK />
              </div>
              <Facebook />
              <Insta />
            </div>
          </div>
          <div className='footer-row'>
            <p className={`theme-${theme}`}>
              Сажникова Ольга, 2021
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