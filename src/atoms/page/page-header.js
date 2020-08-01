import React from 'react';
import classNames from 'classnames';

const PageHeader = ({ className, children, ...others }) => {
  return (
    <header
      {...others}
      className={classNames('header', className)}
      data-testid="page-header"
    >
      {children}
    </header>
  );
};

export default PageHeader;
