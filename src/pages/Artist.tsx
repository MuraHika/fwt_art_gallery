import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Slider from "../components/Slider";
import ArtistHeader from "../components/ArtistHeader";
import { getPaintingsOfArtist, setArtist } from "../slices/artistSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useToolkit";
import "./styles.scss";

function Artist() {
  const theme = useAppSelector((state) => state.artists.theme);
  const loading = useAppSelector((state) => state.artists.loading);

  const artists = useAppSelector((state) => state.artists.arr_artists);
  const artist = useAppSelector((state) => state.artists.artist);
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  const [isSlader, setIsSlader] = useState<boolean>(false);
  const [paintOnSlider, setPaintOnSlider] = useState<string>("");
  const dispatch = useAppDispatch();
  const params = useParams();
  
  useEffect(() => {
    console.log("name_paints", artists);
    if (artists.length !== 0) {
      const index = artists.findIndex(el => el._id === params.artistId);
      dispatch(setArtist(artists[index]));
    }
    if (params.artistId !== undefined) {
      dispatch(getPaintingsOfArtist(params.artistId));
    }
  }, [artists]);

  const setSlider = (paintId: string) => {
    setPaintOnSlider(paintId);
    setIsSlader(!isSlader);
  };

  return (
    <div className={`artist_page artist_page--${theme}`}>

      {isSlader && <Slider theme={theme} paint={paintOnSlider} paintings={paintings} setSlider={setSlider} artist={artist}/>}
      <Header theme={theme} />
      {!loading && artist !== null && <ArtistHeader theme={theme} artist={artist}/>}
      {loading && <Loader theme={theme}/>}
      {!loading && artist !== null && <div className="grid_layout__painting">
        <GridLayout items={{ type: 'artist', array: paintings }} theme={theme} setSlider={setSlider}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Artist;