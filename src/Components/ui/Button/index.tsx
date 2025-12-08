import React from 'react';
import './styles.css';
import type { ButtonProps } from './types';


const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  active = false,
  className = '',
  children,
  ...props
}) => {
  const getVariantClass = () => {
    if (variant === 'nav') {
      return active ? 'button--nav-active' : 'button--nav-inactive';
    }
    return `button--${variant}`;
  };

  const baseClass = variant === 'nav' ? 'button--nav' : 'button';
  const sizeClass = variant === 'nav' ? '' : `button--${size}`;

  const classes = [
    baseClass,
    sizeClass,
    getVariantClass(),
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;