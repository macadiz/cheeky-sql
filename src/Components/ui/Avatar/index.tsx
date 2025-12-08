import React from 'react';
import './styles.css';
import type { AvatarProps } from './types';

const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  variant = 'primary',
  src,
  alt,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'avatar',
    `avatar--${size}`,
    `avatar--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="avatar__image" />
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;