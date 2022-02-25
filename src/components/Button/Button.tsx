import React from 'react';
import "./styles.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: any;
  size?: "large" | "medium" | "small";
  isPrimary?: boolean;
  theme?: "dark" | "light";
  paddings: string;
}

const Button : React.FunctionComponent<ButtonProps> = ({
  text,
  size,
  isPrimary,
  theme,
  paddings,
  ...props } : ButtonProps) => (
    <button {...props} 
    className={`button button--${size} ${isPrimary ? `button--primary_${theme}` : `button--secondary_${theme}`}`} 
    type='button' 
    style={{ padding: paddings }}>
        {text}
    </button>
);

export default Button;

Button.defaultProps = {
  size: "medium",
  isPrimary: true,
  theme: "light",
};