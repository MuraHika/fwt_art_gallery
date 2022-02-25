import React from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";

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
  }, {
    id: 32,
    author: "James Whistler",
    painting: "Alice Butt",
  }, {
    id: 13,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 23,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }, {
    id: 33,
    author: "James Whistler",
    painting: "Alice Butt",
  }, {
    id: 14,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 24,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }, {
    id: 34,
    author: "James Whistler",
    painting: "Alice Butt",
  }, {
    id: 15,
    author: "James Whistler",
    painting: "Old Battersea Bridge",
  }, {
    id: 25,
    author: "James Whistler",
    painting: "Arrangement in Grey and Black",
  }, {
    id: 35,
    author: "James Whistler",
    painting: "Alice Butt",
  }];

  return (
    < div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Header theme={theme} />
    <GridLayout items={artists} />
    <Footer theme={theme} />
    </div>
  );
}

export default Main;