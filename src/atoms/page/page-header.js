import React from 'react';
import clsx from 'clsx';

const PageHeader = ({ className, children, ...others }) => {
  return (
    <header
      {...others}
      className={clsx('header', className)}
      data-testid="page-header"
    >
      {children}
    </header>
  );
};

export default PageHeader;
