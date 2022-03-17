import React, { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet";
import { batch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/useToolkit";
import { getArtists, getGenres, setTheme, setLoading, getAuthToken } from "./slices/artistSlice";

function App() {
  const MainPage = React.lazy(() => import("./pages/Main"));
  const ArtistPage = React.lazy(() => import("./pages/Artist"));

  const dispatch = useAppDispatch();

  useEffect(() => {
    batch(() => {
      setTimeout(async () => {
        // await getToken();
        dispatch(getArtists());
        dispatch(getGenres());
        dispatch(setLoading(false));
      }, 1000);
    });

    const theme = document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === "theme" ? decodeURIComponent(parts[1]) : r;
    }, '');
    dispatch(setTheme( theme === "light" ? "light" : "dark"));
    console.log("cookie", theme);
  }, []);

  const getToken = async () => {
    await dispatch(getAuthToken());
  };

  return (
    <div>
      <Helmet>
        <title>FWT | Art Gallery</title>
        <meta name="FWT" content="FWT Art Gallery" />
      </Helmet>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="artist/" element={<ArtistPage />} />
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
