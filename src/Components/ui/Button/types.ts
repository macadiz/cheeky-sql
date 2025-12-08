import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'nav';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children: React.ReactNode;
};