import React from 'react';
import clsx from 'clsx';

import PageHeader from './page-header';
import PageBody from './page-body';
import PageFooter from './page-footer';

import './page.scss';

const Page = ({ className, children }) => {
  return (
    <article
      role="article"
      className={clsx('cb-page', className)}
      data-testid="cb-page"
    >
      {children}
    </article>
  );
};

Page.propTypes = {};

Page.Header = PageHeader;
Page.Body = PageBody;
Page.Footer = PageFooter;

export default Page;
