import React from 'react';
import "./styles.scss";
import Tag from '../Tag';
import Accordion from '../Accordion';
import ArtistAva from "../../assets/artist_ava.png";

interface ArtistHeaderProps {
  theme?: "dark" | "light";
}

function ArtistHeader({ theme } : ArtistHeaderProps) {

  const genres = ["anime & manga", "architectural", "maya", "realistic", "Unreal engine", "weapons"];
  const text = "He studied in the Russian Empire and the United States, but spent most of his active life in England. He is best known for his portraits of his contemporaries. Experienced the influence of realists in the person of his friend Gustave Courbet and the Pre-Raphaelites, as well as Japanese art. In a number of creative methods it was close to impressionism.";

  return (
  // <div style={{ width: "100%" }}>
      <div className={`artist-container artist-container--${theme}`}>
        <div className="artist-profile">
          <img className='artist_profile-picture' src={`${ArtistAva}`} alt="author"/>
          {/* <div className='artist_profile-picture' style={{ backgroundImage: `url(${ArtistAva})` }} /> */}
          <span className='artist_profile-name'>James Whistler</span>
          <span className='artist_profile-year'>July 11, 1834 - July 17, 1903</span>
        </div>
        <div className={`artist-info artist-info--${theme}`}>
          <Accordion theme={theme} text={text} />
          <span className='artist_info-place'>London, Great Britain</span>
          <div className='artist-tags'>
            {genres.map((el) => (
              <Tag text={el} key={el}/>
            ))}
          </div>
        </div>
      </div>
  // </div>
  );
}

export default ArtistHeader;

ArtistHeader.defaultProps = {
  theme: "light",
};