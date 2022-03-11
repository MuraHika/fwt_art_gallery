import React, { useEffect } from 'react';
import "./styles.scss";
import ResizeScreen from "../../utils/ScreenSize";
import Card from "../Card/index";


type TypeArtists = {
  id: string | number;
  name: string;
  years_live?: string;
  painting: string;
  created?: string;
  image?: string;
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
  useEffect(() => {
    console.log("type type", items);
  }, []);

  return (
    <div className={`grid grid--${theme}`}>
      {items.type === 'artist' && arr.map((el: TypeArtists) => (
        <Card 
          key={el.id}
          type={items.type}
          obj={{
            author_name: el.name,
            picture_name: el.painting,
            date_created: el.created,
            src_img: el.image,
            years_live: el.years_live,
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
