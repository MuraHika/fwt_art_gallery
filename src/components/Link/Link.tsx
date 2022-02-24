import React from 'react';
import "./styles.scss";

interface LinkProps {
  url: string;
  text: string;
  theme?: "dark" | "light";
}

export default function Link(
  {
    text,
    url,
    theme,
  } : LinkProps,
) {
  return (
    <a href={url} className={`link link--${theme}`} type='button'>
        {text}
    </a>
  );
}

Link.defaultProps = {
  theme: "light",
};