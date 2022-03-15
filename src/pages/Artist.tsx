import React, { useEffect } from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ArtistHeader from "../components/ArtistHeader";
import { useAppSelector } from "../hooks/useToolkit";
import "./styles.scss";

function Artist() {
  const theme = useAppSelector((state) => state.artists.theme);
  const loading = useAppSelector((state) => state.artists.loading);

  const artist = useAppSelector((state) => state.artists.arr_artists)[2];
  
  useEffect(() => {
    console.log("name_paints", artist);
  }, []);

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      {!loading && artist !== undefined && <ArtistHeader theme={theme} artist={artist}/>}
      {loading && <Loader theme={theme}/>}
      {!loading && artist !== undefined && <div className="grid_layout__painting">
        <GridLayout items={{ type: 'artist', array: artist }} theme={theme}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Artist;