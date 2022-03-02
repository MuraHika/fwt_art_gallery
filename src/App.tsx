import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Main from "./pages/Main";
import { useAppDispatch } from "./hooks/useToolkit";
import { getArtists } from "./slices/artistSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArtists());
  }, []);
  
  return <div>
    <Helmet>
      <title>FWT | Art Gallery</title>
      <meta name="FWT" content="FWT Art Gallery" />
    </Helmet>
  <Main />
  </div>;
}

export default App;
