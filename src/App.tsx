import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Main from "./pages/Main";
import { useAppDispatch } from "./hooks/useToolkit";
import { getArtists, setTheme } from "./slices/artistSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArtists());

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
      <Main />
    </div>
  );
}

export default App;
