import React, { useEffect } from 'react';
import "./styles.scss";
import Tag from '../Tag';
import Accordion from '../Accordion';
import { TypeArtists } from "../../utils/Types";
import ResizeScreen from "../../utils/ScreenSize";

const { LOCAL_HOST } = process.env;

interface ArtistHeaderProps {
  theme?: "dark" | "light";
  artist: TypeArtists;
}

function ArtistHeader({ theme, artist } : ArtistHeaderProps) {

  const placeBorn = "London, Great Britian";
  const screen = ResizeScreen();
  useEffect(() => {
    console.log(artist);
  }, []);

  return (
    <div className={`artist-container artist-container--${theme}`}>
      <div className="artist-profile">
        <img className='artist_profile-picture' src={`${LOCAL_HOST}${screen.isDesktop ? artist.avatar.webp2x : artist.avatar.webp}`} alt="author" loading="eager"/>
        <span className='artist_profile-name'>{artist.name}</span>
        <span className='artist_profile-year'>{artist.yearsOfLife}</span>
      </div>
      <div className={`artist-info artist-info--${theme}`}>
        {artist.description !== "" && <Accordion theme={theme} text={artist.description} /> }
        <span className='artist_info-place'>{placeBorn}</span>
        <div className='artist-tags'>
          {artist.genres.map((el) => (
            <Tag text={el.name} key={el._id}/>
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