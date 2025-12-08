import React from 'react';

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'blue' | 'purple' | 'red' | 'yellow';
  src?: string;
  alt?: string;
  children?: React.ReactNode;
};