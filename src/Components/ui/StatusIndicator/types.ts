import React from 'react';

export type StatusIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  status: 'online' | 'offline' | 'busy' | 'away' | 'connecting';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
};