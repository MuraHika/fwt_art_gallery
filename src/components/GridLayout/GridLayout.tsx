import React from 'react';
import "./styles.scss";
import ResizeScreen from "../../utils/ScreenSize";
import Card from "../Card/index";

interface GridLayoutProps {
  items: any[],
  theme: string,
}

export default function GridLayout(
  {
    items,
    theme,
  } : GridLayoutProps,
) {
  const screen = ResizeScreen();
  const onClickPicture = () => {
    console.log("istablet", screen.isTabltet);

    console.log("screen", window.innerWidth);
  };

  return (
    <div className={`grid grid--${theme}`}>
      {items.map((el) => (
        <Card 
          key={el.id} 
          author_name={el.name} 
          picture_name={el.painting} 
          date_created={el.created} 
          src_img={el.image} 
          years_live={el.years_live} 
          onClick={onClickPicture} 
        />
      ),
      )}
    </div>
  );
}
