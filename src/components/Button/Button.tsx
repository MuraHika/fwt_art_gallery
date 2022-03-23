import React from 'react';
import "./styles.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: any;
  size?: "large" | "medium" | "small";
  isPrimary?: boolean;
  theme?: "dark" | "light";
  paddings: string;
  type?: "submit" | "reset" | "button";
}

const Button : React.FunctionComponent<ButtonProps> = ({
  text,
  size,
  isPrimary,
  theme,
  type,
  paddings,
  ...props } : ButtonProps) => (
    <button {...props} 
    className={`button button--${size} ${isPrimary ? `button--primary_${theme}` : `button--secondary_${theme}`}`} 
    style={{ padding: paddings }}
    // eslint-disable-next-line react/button-has-type
    type={type}>
        {text}
    </button>
);

export default Button;

Button.defaultProps = {
  size: "medium",
  isPrimary: true,
  theme: "light",
  type: "button",
};