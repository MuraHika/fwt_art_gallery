import React from "react";
import { Helmet } from "react-helmet";
import Main from "./pages/Main";

function App() {
  return <div>
    <Helmet>
      <title>FWT | Art Gallery</title>
      <meta name="FWT" content="FWT Art Gallery" />
    </Helmet>
  <Main />
  </div>;
}

export default App;
