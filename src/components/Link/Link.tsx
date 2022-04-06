import React from 'react';
import './styles.scss';

interface LinkProps extends React.LiHTMLAttributes<HTMLAnchorElement> {
  url: string;
  text: string;
  theme?: 'dark' | 'light';
}

const Link: React.FunctionComponent<LinkProps> = ({
  text,
  url,
  theme,
  ...props
}: LinkProps) => (
  <a {...props} href={url} className={`link link--${theme}`} type="button">
    {text}
  </a>
);

export default Link;

Link.defaultProps = {
  theme: 'light',
};
