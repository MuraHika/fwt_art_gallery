import React, { useEffect } from "react";
import Header from "../components/Header";
import GridLayout from "../components/GridLayout";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ArtistHeader from "../components/ArtistHeader";
import { useAppSelector } from "../hooks/useToolkit";
import "./styles.scss";

function Artist() {
  // const artists = useAppSelector((state) => state.artists.arr_artists);
  const theme = useAppSelector((state) => state.artists.theme);
  const loading = useAppSelector((state) => state.artists.loading);

  const paints = [
    { id: 1, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: "" }, 
    { id: 2, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 3, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 4, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 5, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 6, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 7, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 8, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }, 
    { id: 9, name: "Syndics of the Drapers' Guild", yearOfCreation: "1662", image: ""  }];
  
  useEffect(() => {
    console.log("name_paints");
  }, []);

  return (
    <div className={`main_page main_page--${theme}`}>
      <Header theme={theme} />
      <ArtistHeader theme={theme} />
      {loading && <Loader theme={theme}/>}
      {!loading && <div className="grid_layout__painting">
        <GridLayout items={{ type: 'paint', array: paints }} theme={theme}/>
      </div>
      }
      <Footer theme={theme} />
    </div>
  );
}

export default Artist;