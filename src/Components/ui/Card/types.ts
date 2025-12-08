import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'feature' | 'interactive';
  padding?: boolean;
  title?: string;
  titleVariant?: 'primary' | 'secondary';
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};