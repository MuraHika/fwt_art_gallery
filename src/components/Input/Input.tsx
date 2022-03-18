import React from 'react';
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  text: string;
  isInputLabel?: boolean;
  isRequierd?: boolean;
  icon?: any;
  isInputSearch?: boolean;
  theme?: "dark" | "light";
}

const Input: React.FunctionComponent<InputProps> = ({
  text,
  isInputLabel,
  isRequierd,
  icon,
  isInputSearch,
  theme,
  ...props } : InputProps) => (
    <div className={`input-container input-container--${theme}`} >
      {isInputLabel && <p>{text}{isRequierd && <span>*</span>}</p>}
      <div className={`input ${isInputSearch ? "input-search" : ""}`}>
        {icon}
        <input {...props} placeholder={isInputLabel ? "" : text}/>
      </div>
    </div>
);

export default Input;

Input.defaultProps = {
  theme: "light",
  isInputLabel: false,
  isRequierd: false,
  isInputSearch: false,
  icon: "",
};