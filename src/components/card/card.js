import React from 'react';
import classNames from 'classnames';

import './card.scss';

const Card = ({ className, collapsed = false, children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames('c-card', className, {
        'c-card--collapsed': collapsed
      })}
    >
      {children}
    </div>
  );
};

export default Card;
