import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Artist from "./pages/Artist";
import { useAppDispatch } from "./hooks/useToolkit";
import { getArtists, getPaintings, getGenres, setTheme } from "./slices/artistSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArtists());
    dispatch(getPaintings());
    dispatch(getGenres());
    const theme = document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === "theme" ? decodeURIComponent(parts[1]) : r;
    }, '');
    dispatch(setTheme( theme === "light" ? "light" : "dark"));
    console.log("cookie", theme);
  }, []);
  
  return (
    <div>
      <Helmet>
        <title>FWT | Art Gallery</title>
        <meta name="FWT" content="FWT Art Gallery" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="artist/" element={<Artist />} />
      </Routes>
    </div>
  );
}

export default App;
