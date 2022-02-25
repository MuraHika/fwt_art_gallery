import React from 'react';
import "./styles.scss";
import ResizeScreen from "../../utils/ScreenSize";
import Card from "../Card/index";

interface GridLayoutProps {
  items: any[],
}

export default function GridLayout(
  {
    items,
  } : GridLayoutProps,
) {
  const screen = ResizeScreen();
  const onClickPicture = () => {
    console.log("istablet", screen.isTabltet);

    console.log("screen", window.innerWidth);
  };

  return (
    <div className='grid'>
      {items.map((el) => (
        <Card key={el.id} author_name={el.author} picture_name={el.painting} onClick={onClickPicture} />
      ),
      )}
    </div>
  );
}
