import React, { useEffect } from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppSelector } from "../hooks/useToolkit";
import "./styles.scss";

function Main() {
  const artists = useAppSelector((state) => state.artists.arr_artists);  
  const theme = useAppSelector((state) => state.artists.theme);
  const loading = useAppSelector((state) => state.artists.loading);

  useEffect(() => {
    console.log("looog", artists);
  }, []);

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      {loading && <Loader theme={theme}/>}
      {!loading && artists.length !== 0 && <div className="grid_layout">
        <GridLayout items={{ type: 'artist', array: artists }} theme={theme}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Main;