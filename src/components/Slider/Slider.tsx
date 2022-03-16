import React, { useEffect} from 'react';
import ResizeScreen from '../../utils/ScreenSize';
import Arrow from "../../assets/Arrow.svg";
import NoImage from "../../assets/no_image.webp";
import { getPaintingsOfArtist } from "../../slices/artistSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useToolkit";
import "./styles.scss";
import { TypeArtists } from '../../utils/Types';

interface SliderProps {
  theme: 'dark' | 'light';
  artist: TypeArtists;
}

export default function Slider({ 
  theme, artist } : SliderProps,
) {
  const screen = ResizeScreen();
  const dispatch = useAppDispatch();
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  
  useEffect(() => {
    dispatch(getPaintingsOfArtist(artist._id));
  }, []);

  return (
    <div className={`container-slider container-slider--${theme}`}>
        {!screen.isMobile && <div className='slider-button_slide button_left' >
            <Arrow /> 
        </div> }
        <div className='slider'> 
            <div className='slider-picture'>
                <img src={NoImage} alt='slider' />
                <div className='slider-navigate'>
                    {paintings.map(el => <div key={el._id} className="slider_navigate-point" />)} 
                </div>
            </div>
            <div className='slider-artist_info'>
                <div className='artist_info'>{artist.mainPainting.name}</div>
                <div className='artist_info'>{artist.mainPainting.yearOfCreation}</div>
            </div>
        </div>
        {!screen.isMobile && <div className='slider-button_slide button_right' >
            <Arrow /> 
        </div> }
    </div>
  );
}