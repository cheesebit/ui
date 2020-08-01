import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../box';

const ListItem = ({ as = 'div', className, children, disabled, ...others }) => {
  return (
    <Box
      as={as}
      data-testid="list-item"
      {...others}
      className={classNames(
        'item',
        {
          'is-disabled': disabled,
        },
        className,
      )}
      role="listitem"
    >
      {children}
    </Box>
  );
};

ListItem.propTypes = {
  disabled: PropTypes.bool,
};

ListItem.defaultProps = {
  disabled: false,
};

export default ListItem;
