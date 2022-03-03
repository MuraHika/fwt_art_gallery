import React from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import { useAppSelector } from "../hooks/useToolkit";
import "./styles.scss";

function Main() {
  const artists = useAppSelector((state) => state.artists.arr_artists);
  const theme = useAppSelector((state) => state.artists.theme);

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      <div className="grid_layout">
        <GridLayout items={artists} theme={theme}/>
      </div>
      <Footer theme={theme} />
    </div>
  );
}

export default Main;