import React from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import "./styles.scss";

function Main() {
  const theme = "dark";
  const artists = [{
    id: 1,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 2,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }, {
    id: 3,
    author: "James Whistler",
    painting: "Alice Butt",
  }, {
    id: 4,
    author: "James Whistler",
    painting: "Whistler in his Studio",
  }, {
    id: 11,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 21,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }, {
    id: 31,
    author: "James Whistler",
    painting: "Alice Butt",
  }, {
    id: 12,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 22,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }];

  return (
    < div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      <GridLayout items={artists} theme={theme}/>
      <Footer theme={theme} />
    </div>
  );
}

export default Main;