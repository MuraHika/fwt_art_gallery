import React from 'react';
import './styles.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: 'large' | 'medium' | 'small';
  isPrimary?: boolean;
  theme?: 'dark' | 'light';
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  size,
  isPrimary,
  theme,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`button button--${size} ${
      isPrimary ? `button--primary_${theme}` : `button--secondary_${theme}`
    }`}
    type="button"
  >
    {text}
  </button>
);

export default Button;

Button.defaultProps = {
  size: 'medium',
  isPrimary: true,
  theme: 'light',
};
