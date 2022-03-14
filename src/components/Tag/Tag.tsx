import React from 'react';
import "./styles.scss";

interface TagProps {
  theme?: "dark" | "light";
  text?: string;
}

function Tag({ theme, text } : TagProps) {
  return (
    <div className={`tag tag--${theme}`}>
      <span>
        {text}
      </span>
    </div>
  );
}

export default Tag;

Tag.defaultProps = {
  theme: "light",
};