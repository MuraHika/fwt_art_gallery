import React from 'react';
import "./styles.scss";
import ArtistAva from "../../assets/artist_ava.png";

interface ArtistHeaderProps {
  theme?: "dark" | "light";
}

function ArtistHeader({ theme } : ArtistHeaderProps) {

  return (
    <div className="artist-container">
      <div className={`artist-profile artist-profile--${theme}`}>
        <div className='artist_profile-picture' style={{ backgroundImage: `url(${ArtistAva})` }} />
        <span className='artist_profile-name'>James Whistler</span>
        <span className='artist_profile-year'>July 11, 1834 - July 17, 1903</span>
      </div>
      <div className={`artist-info artist-info--${theme}`}>
        dd
      </div>
    </div>
  );
}

export default ArtistHeader;

ArtistHeader.defaultProps = {
  theme: "light",
};