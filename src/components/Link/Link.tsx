import React from 'react';
import "./styles.scss";

interface LinkProps extends React.LiHTMLAttributes<HTMLAnchorElement> {
  url: string;
  text: string;
  isTargetBlank?: boolean;
  theme?: "dark" | "light";
}

const Link : React.FunctionComponent<LinkProps> = ({
  text,
  url,
  theme,
  isTargetBlank,
  ...props } : LinkProps) => (
    <a {...props} href={url}  target={`${isTargetBlank ? "_blank" : "_self"}`} className={`link link--${theme}`} type='button'>
        {text}
    </a>
);

export default Link;

Link.defaultProps = {
  theme: "light",
  isTargetBlank: true,
};