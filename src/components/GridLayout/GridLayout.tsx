import React, { useEffect } from 'react';
import "./styles.scss";
import Card from "../Card/index";
import { TypeArtists, TypePaintings } from "../../utils/Types";
import { useAppDispatch, useAppSelector } from "../../hooks/useToolkit";
import { getPaintingsOfArtist } from "../../slices/artistSlice";
import ResizeScreen from "../../utils/ScreenSize";

type CardArt = {
  type: 'artist' | 'paint';
  array: TypeArtists | TypeArtists[];
};

interface GridLayoutProps {
  items: CardArt,
  theme: string,
}

function identity(arg: any): any {
  return arg;
}

export default function GridLayout(
  {
    items,
    theme,
  } : GridLayoutProps,
) {

  const dispatch = useAppDispatch();
  const screen = ResizeScreen();
  const arr = identity(items.array);
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  
  useEffect(() => {
    if (items.type === 'artist') {
      dispatch(getPaintingsOfArtist(arr._id));
      console.log("type type", paintings);
    }
  }, []);

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
        />
      ))}

      {items.type === 'artist' && paintings.length !== 0 && paintings.map((el: TypePaintings) => (
        <Card 
          key={el._id} 
          type={items.type}
          obj={{
            src_img: screen.isDesktop ? el.image.webp2x : el.image.webp,
            name: el.name,
            yearOfCreation: el.yearOfCreation,
          }}
        />
      ))}
    </div>
  );
}
