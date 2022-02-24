import React from 'react';
import "./styles.scss";

interface ButtonProps {
  text: string;
  size?: "large" | "medium" | "small";
  isPrimary?: boolean;
  theme?: "dark" | "light";
}

export default function Button(
  {
    text,
    size,
    isPrimary,
    theme,
  } : ButtonProps,
) {
  return (
    <button className={`button button--${size} ${isPrimary ? `button--primary_${theme}` : `button--secondary_${theme}`}`} type='button'>
        {text}
    </button>
  );
}

Button.defaultProps = {
  size: "medium",
  isPrimary: true,
  theme: "light",
};