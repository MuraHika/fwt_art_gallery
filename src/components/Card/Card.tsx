import React, { useEffect, useState } from 'react';
import "./styles.scss";
import NoImage from "../../assets/no_image.png";

interface CardProps {
  src_img?: string;
  author_name: string; 
  years_live?: string;
  picture_name: string;
  date_created?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Card({ 
  src_img,
  author_name, 
  years_live,
  picture_name,
  date_created,
  onClick } : CardProps,
) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isTabletScreen, setisTabletScreen] = useState(false);
  useEffect(() => {
    console.log(screenWidth);
    // setisTabletScreen(!!(window.innerWidth >= 320 && window.innerWidth < 768));
    setScreenWidth(window.innerWidth);
  }, [window.innerWidth]);

  const urlImage = src_img === undefined ? NoImage : src_img;
  const onTapFooter = () => {
    if (screenWidth < 768 && screenWidth >= 320) {
      setisTabletScreen(!isTabletScreen);
    }
  };
  return (
    <div className="container-card" 
    style={{ backgroundImage: `url(${urlImage})` }}
    onClick={onClick}
    >
      <div className={`container-card__footer ${isTabletScreen ? "container-card__footer--hover" : ""}`} onClick={onTapFooter}>
        <h1>{author_name}</h1>
        <div className="container-card__footer__row">
          <h2 className='row__years'>{years_live}</h2>
        </div>
        <div className="container-card__footer__row">
          <h2>Name: </h2>
          <p>{picture_name}</p>
        </div>
        { date_created && <div className="container-card__footer__row">
          <h2>Created: </h2>
          <p>{date_created}</p>
        </div>
        }
      </div>
    </div>
  );
}