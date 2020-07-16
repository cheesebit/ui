import React from 'react';
import classNames from 'classnames';

import PageHeader from './page-header';
import PageBody from './page-body';

import './page.scss';

const Page = ({ className, children }) => {
  return (
    <article
      role="article"
      className={classNames('cb-page', className)}
      data-test="cb-page"
    >
      {children}
    </article>
  );
};

Page.propTypes = {};

Page.Header = PageHeader;
Page.Body = PageBody;

export default Page;