import React from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import "./styles.scss";
import { artists } from "../../db.json";

function Main() {
  const theme = "dark";

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