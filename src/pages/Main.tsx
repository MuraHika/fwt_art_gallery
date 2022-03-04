import React from "react";
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

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      {loading && <Loader theme={theme}/>}
      {!loading && <div className="grid_layout">
        <GridLayout items={artists} theme={theme}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Main;