import React, { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet";
import { batch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/useToolkit";
import { getArtists, getGenres, setLoading } from "./slices/artistSlice";
import { getAuthToken } from "./slices/userSlice";

function App() {
  const MainPage = React.lazy(() => import("./pages/Main"));
  const ArtistPage = React.lazy(() => import("./pages/Artist"));
  // const Login = React.lazy(() => import("./components/ModalForms/ModalAuth"));
  // const Register = React.lazy(() => import("./components/ModalForms/ModalRegister"));

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
            <Route path="artist/:artistId" element={<ArtistPage />}/>
            {/* <Route path="login/" element={<Login />} />
            <Route path="register/" element={<Register />} /> */}
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
