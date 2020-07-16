import React from 'react';
import classNames from 'classnames';

import './card.scss';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames('cb-card', className)}
      data-test="cb-test"
    >
      {children}
    </div>
  );
};

export default Card;
