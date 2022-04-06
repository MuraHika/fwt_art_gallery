import React from 'react';
import './styles.scss';
import Card from '../Card/index';

interface GridLayoutProps {
  items: any[];
}

export default function GridLayout({ items }: GridLayoutProps) {
  const onClickPicture = () => {
    // заглушка
    console.log('done');
  };

  return (
    <div className="grid">
      {items.map(el => (
        <Card
          key={el.id}
          author_name={el.author}
          picture_name={el.painting}
          onClick={onClickPicture}
        />
      ))}
    </div>
  );
}
