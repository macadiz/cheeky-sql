import React from 'react';
import './styles.css';
import type { StatusIndicatorProps } from './types';

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  pulse = false,
  className = '',
  ...props
}) => {
  const classes = [
    'status-indicator',
    `status-indicator--${size}`,
    `status-indicator--${status}`,
    pulse && 'status-indicator--pulse',
    className
  ].filter(Boolean).join(' ');

  return <div className={classes} {...props} />;
};

export default StatusIndicator;