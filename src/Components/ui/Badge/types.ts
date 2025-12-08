import React from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
};