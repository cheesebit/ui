import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ListItem from './list-item';

import './list.scss';

const List = ({
  as = 'section',
  bordered,
  className,
  children,
  hoverable,
  striped,
  ...others
}) => {
  const Tag = as;

  return (
    <Tag
      data-testid="cb-list"
      role="list"
      {...others}
      className={classNames(
        'cb-list',
        {
          '-bordered': bordered,
          '-hoverable': hoverable,
          '-striped': striped,
        },
        className,
      )}
    >
      {children}
    </Tag>
  );
};

List.propTypes = {
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
};

List.Item = ListItem;

export default List;
