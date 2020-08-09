import React from 'react';
import clsx from 'clsx';

import './card.scss';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={clsx('cb-card', className)}
      data-testid="cb-test"
    >
      {children}
    </div>
  );
};

export default Card;
