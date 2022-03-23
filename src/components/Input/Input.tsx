import React from 'react';
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  text: string;
  isInputLabel?: boolean;
  isRequierd?: boolean;
  error?: string;
  icon?: any;
  isInputSearch?: boolean;
  theme?: "dark" | "light";
}

const Input: React.FunctionComponent<InputProps> = ({
  text,
  isInputLabel,
  isRequierd,
  error,
  icon,
  isInputSearch,
  theme,
  ...props } : InputProps) => (
    <div className={`input-container input-container--${theme}`} >
      {isInputLabel && <p>{text}{isRequierd && <span>*</span>}</p>}
      <div className={`input ${isInputSearch ? "input-search" : ""} ${error !== "error" ? "input-error" : ""}`}>
        {icon}
        <input {...props} placeholder={isInputLabel ? "" : text}/>
      </div>
      <span className='error' style={{ visibility: error !== "error" ? "visible" : "hidden"  }}>{error}</span>
    </div>
);

export default Input;

Input.defaultProps = {
  theme: "light",
  isInputLabel: false,
  isRequierd: false,
  isInputSearch: false,
  icon: "",
  error: "",
};