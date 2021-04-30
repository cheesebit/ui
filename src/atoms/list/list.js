import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import ListContext from './list-context';
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
    <ListContext.Provider value={{ bordered }}>
      <Tag
        data-testid="cb-list"
        role="list"
        {...others}
        className={clsx(
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
    </ListContext.Provider>
  );
};

List.propTypes = {
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
};

List.defaultProps = {
  bordered: false,
  striped: false,
  hoverable: false,
  as: 'section',
};

List.Item = ListItem;

export default List;
