import React, { useEffect } from 'react';
import "./styles.scss";
import Card from "../Card/index";

import { useAppSelector } from "../../hooks/useToolkit";

type TypeArtists = {
  id: string;
  paintings: string[];
  genres: string[];
  name: string;
  description:string;
  yearsOfLife?: string;
  avatar: string;
  mainPainting: string;
};

interface TypePaint {
  id: string | number;
  name: string;
  yearOfCreation: string;
  image?: string;
}

type CardArt = {
  type: 'artist' | 'paint';
  array: TypeArtists[] | TypePaint[];
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

  const arr = identity(items.array);
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  
  useEffect(() => {
    console.log("type type", items);
  }, []);

  return (
    <div className={`grid grid--${theme}`}>
      {items.type === 'artist' && paintings.length !== 0 && arr.map((el: TypeArtists) => (
        <Card 
          key={el.id}
          type={items.type}
          obj={{
            author_name: el.name,
            picture_name: paintings.find(paint => paint.id === el.mainPainting)!.name,
            date_created: paintings.find(paint => paint.id === el.mainPainting)!.yearOfCreation,
            src_img: el.mainPainting,
            years_live: el.yearsOfLife,
          }}
        />
      ))}

      {items.type === 'paint' && arr.map((el: TypePaint) => (
        <Card 
          key={el.id} 
          type={items.type}
          obj={{
            src_img: el.image,
            name: el.name,
            yearOfCreation: el.yearOfCreation,
          }}
        />
      ))}
    </div>
  );
}
