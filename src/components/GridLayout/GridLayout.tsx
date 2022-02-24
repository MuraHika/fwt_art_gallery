import React from 'react';
import "./styles.scss";
import Card from "../Card/index";

interface GridLayoutProps {
  items: any[],
}

export default function GridLayout(
  {
    items,
  } : GridLayoutProps,
) {
  const onClickPicture = () => {
    console.log("cliick picture");
  };

  return (
    <div className='grid'>
      {items.map((el) => (
        <Card author_name={el.author} picture_name={el.painting} onClick={onClickPicture} />
      ),
      )}
    </div>
  );
}
