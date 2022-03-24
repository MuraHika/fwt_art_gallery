import React, { useEffect } from 'react';
import "./styles.scss";
import { useNavigate } from 'react-router-dom';
import Card from "../Card/index";
import { TypeArtists, TypePaintings } from "../../utils/Types";
import ResizeScreen from "../../utils/ScreenSize";
import { useAppDispatch, useAppSelector } from '../../hooks/useToolkit';
import { setArtist } from '../../slices/artistSlice';

type CardArt = {
  type: 'artist' | 'paint';
  array: TypePaintings[] | TypeArtists[];
};

interface GridLayoutProps {
  items: CardArt,
  theme: string,
  setSlider?: any,
}

function identity(arg: any): any {
  return arg;
}

export default function GridLayout(
  {
    items,
    theme,
    setSlider,
  } : GridLayoutProps,
) {

  const screen = ResizeScreen();
  const arr = identity(items.array);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.artists.isLogin);
  
  useEffect(() => {
    if (items.type === 'artist') {
      console.log("type type", items.array);
    }
  }, []);

  const redirectToArtist = async (artist: TypeArtists) => {
    if (isLogin) {
      await dispatch(setArtist(artist));
      console.log(artist);
      navigate(`artist/${artist._id}`);
    }
  };

  return (
    <div className={`grid grid--${theme}`}>
      {items.type === 'paint' && arr.length !== 0 && arr.map((el: TypeArtists) => (
        <Card 
          key={el._id}
          type={items.type}
          obj={{
            author_name: el.name,
            picture_name: el.mainPainting.name,
            date_created: el.mainPainting.yearOfCreation,
            src_img: screen.isDesktop ? el.mainPainting.image.webp2x : el.mainPainting.image.webp,
            years_live: el.yearsOfLife,
          }}
          onClick={() => redirectToArtist(el)}
        />
      ))}

      {items.type === 'artist' && arr.length !== 0 && arr.map((el: TypePaintings) => (
        <Card 
          key={el._id} 
          type={items.type}
          obj={{
            id: el._id,
            src_img: screen.isDesktop ? el.image.webp2x : el.image.webp,
            name: el.name,
            yearOfCreation: el.yearOfCreation,
          }}
          onClick={setSlider}
        />
      ))}
    </div>
  );
}
