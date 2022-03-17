import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Slider from "../components/Slider";
import ArtistHeader from "../components/ArtistHeader";
import { getPaintingsOfArtist } from "../slices/artistSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useToolkit";
import "./styles.scss";

function Artist() {
  const theme = useAppSelector((state) => state.artists.theme);
  const loading = useAppSelector((state) => state.artists.loading);

  const artist = useAppSelector((state) => state.artists.arr_artists)[7];
  const paintings = useAppSelector((state) => state.artists.arr_paintings);
  const [isSlader, setIsSlader] = useState<boolean>(false);
  const [paintOnSlider, setPaintOnSlider] = useState<string>("");
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log("name_paints", artist);
    if (artist !== undefined) {
      dispatch(getPaintingsOfArtist(artist._id));
    }
  }, [artist]);

  const setSlider = (paintId: string) => {
    setPaintOnSlider(paintId);
    setIsSlader(!isSlader);
  };

  return (
      <div className={`main_page main_page--${theme}`}>

        {isSlader && <Slider theme={theme} paint={paintOnSlider} paintings={paintings} setSlider={setSlider}/>}
        <Header theme={theme} />
        {!loading && artist !== undefined && <ArtistHeader theme={theme} artist={artist}/>}
        {loading && <Loader theme={theme}/>}
        {!loading && artist !== undefined && <div className="grid_layout__painting">
          <GridLayout items={{ type: 'artist', array: paintings }} theme={theme} setSlider={setSlider}/>
        </div>
        }
        <Footer theme={theme} />
      </div>
  );
}

export default Artist;