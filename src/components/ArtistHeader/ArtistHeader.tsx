import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Tag from '../Tag';
import Accordion from '../Accordion';
import ArtistAva from "../../assets/artist_ava.webp";
import { useAppSelector } from "../../hooks/useToolkit";

interface ArtistHeaderProps {
  theme?: "dark" | "light";
  authorId: string;
}

function ArtistHeader({ theme, authorId } : ArtistHeaderProps) {
  
  const genres = useAppSelector((state) => state.artists.arr_genres);
  const artists = useAppSelector((state) => state.artists.arr_artists);
  // const images = useAppSelector((state) => state.artists.arr_genres);
  
  interface TypeArtist {
    name: string;
    yearLives: string;
    description: string;
    placeBorn: string;
    genres: string[];
  }

  const [artist, setArtist] = useState<TypeArtist>({ 
    name: "",
    yearLives: "",
    placeBorn: "",
    genres: [],
    description: "",
  });

  useEffect(() => {
    const objArt = artists.find(el => el.id === authorId);
    if (objArt !== undefined){
      setArtist({
        name: objArt.name,
        yearLives: objArt.yearsOfLife,
        placeBorn: "London",
        genres: objArt.genres,
        description: objArt.description,
      });
    }
  }, [artists]);

  return (
    <div className={`artist-container artist-container--${theme}`}>
      <div className="artist-profile">
        <img className='artist_profile-picture' src={`${ArtistAva}`} alt="author"/>
        <span className='artist_profile-name'>{artist.name}</span>
        <span className='artist_profile-year'>{artist.yearLives}</span>
      </div>
      <div className={`artist-info artist-info--${theme}`}>
        {artist.description !== "" && <Accordion theme={theme} text={artist.description} /> }
        <span className='artist_info-place'>{artist.placeBorn}</span>
        <div className='artist-tags'>
          {artist.genres.map((el) => (
            <Tag text={genres.find(genre => genre.id === el)?.name} key={el}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistHeader;

ArtistHeader.defaultProps = {
  theme: "light",
};