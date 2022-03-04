import React from 'react';
import "./styles.scss";
import LoaderSVG from "../../assets/loader.svg";

interface LoaderProps {
  theme?: "dark" | "light";
}

function Loader({ theme } : LoaderProps) {

  return (
    <div className="loader">
      <div className={`loader-animate loader-animate--${theme}`}>
        <LoaderSVG />
        <LoaderSVG />
        <LoaderSVG />
      </div>
    </div>
  );
}

export default Loader;

Loader.defaultProps = {
  theme: "light",
};