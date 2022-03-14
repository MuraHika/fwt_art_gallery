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
  
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  const images = useAppSelector((state) => state.artists.arr_genres);

  const authorId = "62220f319b8d0e56d1cea409";
  const paints = paintings.filter(el => el.artist === authorId);
  
  useEffect(() => {
    console.log("name_paints", paints);
  }, []);

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      {!loading && <ArtistHeader theme={theme} authorId={authorId}/>}
      {loading && <Loader theme={theme}/>}
      {!loading && <div className="grid_layout__painting">
        <GridLayout items={{ type: 'paint', array: paints }} theme={theme}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Artist;