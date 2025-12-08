import React from 'react';
import './styles.css';
import type { BadgeProps } from './types';


const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'badge',
    `badge--${size}`,
    `badge--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;