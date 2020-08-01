import React from 'react';
import classNames from 'classnames';

const PageFooter = ({ className, children, ...others }) => {
  return (
    <footer
      {...others}
      className={classNames('footer', className)}
      data-testid="page-footer"
    >
      {children}
    </footer>
  );
};

export default PageFooter;
