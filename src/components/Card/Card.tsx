import React from 'react';
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
  const urlImage = src_img === undefined ? NoImage : src_img;
  return (
    <div className="container-card" 
    style={{ backgroundImage: `url(${urlImage})` }}
    onClick={onClick}
    >
            <div className="container-card__footer">
              <h1>{author_name}</h1>
              <div className="container-card__footer__row">
                <p className='row__years'>{years_live}</p>
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