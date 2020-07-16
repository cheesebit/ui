import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { evaluateBorderless } from '../../common/props-toolset';

const PageBody = ({ className, children, borderless, ...others }) => {
  return (
    <article
      {...others}
      className={classNames('body', className, evaluateBorderless(borderless))}
      data-test="page-body"
    >
      {children}
    </article>
  );
};

PageBody.propTypes = {
  borderless: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'top',
        'right',
        'bottom',
        'left',
        'horizontal',
        'vertical',
      ]),
    ),
  ]),
};

PageBody.defaultProps = {
  borderless: DEFAULT.ARRAY,
};

export default PageBody;
