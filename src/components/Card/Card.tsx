import React, { useEffect, useState } from 'react';
import "./styles.scss";
import ResizeScreen from "../../utils/ScreenSize";

import NoImage from "../../assets/no_image.webp";

const { LOCAL_HOST } = process.env;
type TypePaint = {
  name: string;
  yearOfCreation?: string;
  src_img?: string;
};

type TypeArtist = {
  picture_name: string;            
  author_name: string;
  date_created?: string;
  years_live?: string;
  src_img?: string;
};

interface CardProps {
  type: 'artist' | 'paint';
  obj: TypePaint | TypeArtist;
}

function identity(arg: any): any {
  return arg;
}

export default function Card({ 
  type,
  obj } : CardProps,
) {
  const [isTabletScreen, setisTabletScreen] = useState(false);
  const screen = ResizeScreen();
  const ob = identity(obj);

  const urlImage = ob.src_img === "" ? NoImage : ob.src_img;
  const onTapFooter = () => {
    if (screen.isTabltet) {
      setisTabletScreen(!isTabletScreen);
    }
  };

 


  useEffect(() => {
    // console.log("type type", files);
  }, []);

  return (
    <div className={`container-card ${type === "artist" ? "container-card__paint" : ""}`} 
      style={{ backgroundImage: `url(${LOCAL_HOST}${urlImage})` }}
    >
      {type === 'paint' && <div className={`container-card__footer ${isTabletScreen ? "container-card__footer--hover" : ""}`} onClick={onTapFooter}>
         
          <h1>{ob.author_name}</h1>
          { ob.date_created &&  <div className="container-card__footer__row">
            <h2 className='row__years'>{ob.years_live}</h2>
          </div>
          }
          <div className='picture-info'>
            <div className="container-card__footer__row">
              <h2>Name: </h2>
              <p>{ob.picture_name}</p>
            </div>
            { ob.date_created && <div className="container-card__footer__row">
              <h2>Created: </h2>
              <p>{ob.date_created}</p>
            </div>
            }
          </div>
      </div>
      }
      {type === 'artist' && <div className='container-card-artist__footer'><h1>{`${ob.name  }, ${  ob.yearOfCreation}`}</h1></div>}
    </div>
  );
}