import React, { useEffect, useState } from 'react';
import ResizeScreen from '../../utils/ScreenSize';
import Arrow from "../../assets/Arrow.svg";
// import NoImage from "../../assets/no_image.webp";
import Favorite from "../../assets/Favorite.svg";
import Delete from "../../assets/Delete.svg";
import Edit from "../../assets/Edit.svg";
import Close from "../../assets/Close.svg";

import "./styles.scss";
import { TypePaintings } from '../../utils/Types';

interface SliderProps {
  theme: 'dark' | 'light';
  paintings: TypePaintings[];
  paint: string;
  setSlider: any;
}

type TypePaintSlider = {
  id: string;
  img: string;
  name: string;
  dateCreated?: string;
};

const { LOCAL_HOST } = process.env;

export default function Slider({ 
  theme, paint, paintings, setSlider } : SliderProps,
) {
  const screen = ResizeScreen();
  const [currentPaint, setCurrentPage] = useState<TypePaintSlider>({ id: "", img: "", name: "", dateCreated: "" });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = React.useRef(currentIndex);

  
  useEffect(() => {
    const index = paintings.findIndex( el => el._id === paint);
    if (index !== -1) {
      setCurrentPage({
        id: paintings[index]._id,
        img: paintings[index].image.webp,
        name: paintings[index].name,
        dateCreated: paintings[index].yearOfCreation,
      });
      setCurrentIndex(index);
      currentIndexRef.current = index;
      window.addEventListener('keydown', onKeyPress);
    }
  }, []);

  const SlidePaint = (slideIndex: number) => {
    console.log("slide on", slideIndex);
    if (slideIndex >= 0 && slideIndex < paintings.length) {
      setCurrentPage({
        id: paintings[slideIndex]._id,
        img: paintings[slideIndex].image.webp,
        name: paintings[slideIndex].name,
        dateCreated: paintings[slideIndex].yearOfCreation,
      });
      setCurrentIndex(slideIndex);
      currentIndexRef.current = slideIndex;
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowRight") {
      SlidePaint(currentIndexRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      SlidePaint(currentIndexRef.current - 1);
    } else if (e.key === "Escape") {
      setSlider(false);
    } 
  };

  return (
    <div className={`container-slider container-slider--${theme}`}>
        {!screen.isMobile && 
            <div 
              className='slider-button_slide button_left' 
              onClick={() => SlidePaint(currentIndex - 1)}
            >
            <Arrow /> 
        </div> }
        <div className='slider'> 
            <div className='slider-slider'>
              <div className='slider-picture'>
                  {currentPaint.img !== "" && <img src={`${LOCAL_HOST}${currentPaint.img}`} alt='slider' />}
                  <div className='slider-navigate'>
                      {paintings.map((el, index) => 
                        <div key={el._id} 
                          className={`slider_navigate-point ${el._id === currentPaint.id ? "slider_navigate-point--active" : "" }`} 
                          onClick={() => SlidePaint(index)}
                        />)
                      } 
                  </div>
              </div>
              <div className='interactive_buttons'>
                <div className='interactive_buttons-icon'><Favorite /></div>
                <div className='interactive_buttons-icon'><Edit /></div>
                <div className='interactive_buttons-icon'><Delete /></div>
              </div>
            </div>
            <div className='close_button' onClick={() => setSlider(false)}><Close /></div>
            <div className='slider-artist_info'>
                <div className='artist_info'>{currentPaint.name}</div>
                <div className='artist_info'>{currentPaint.dateCreated}</div>
            </div>
        </div>
        {!screen.isMobile && 
          <div 
            className='slider-button_slide button_right'  
            onClick={() => SlidePaint(currentIndex + 1)}
          >
            <Arrow /> 
        </div> }
    </div>
  );
}