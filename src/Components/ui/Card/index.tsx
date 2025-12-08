import React from 'react';
import './styles.css';
import type { CardProps } from './types';

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = true,
  title,
  titleVariant = 'primary',
  subtitle,
  icon,
  className = '',
  children,
  ...props
}) => {
  const getCardClasses = () => {
    const baseClass = variant === 'feature' ? 'card--feature' : 'card';
    const classes = [baseClass];

    if (variant === 'interactive') {
      classes.push('card--interactive');
    }

    if (padding && variant !== 'feature') {
      classes.push('card--padding');
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  const getTitleClass = () => {
    return titleVariant === 'secondary' ? 'card__title--secondary' : 'card__title';
  };

  return (
    <div className={getCardClasses()} {...props}>
      {(title || subtitle || icon) && (
        <div className="card__header">
          {icon && <div className="card__icon">{icon}</div>}
          {title && <h3 className={getTitleClass()}>{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export default Card;