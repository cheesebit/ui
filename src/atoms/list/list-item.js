import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import ListContext from './list-context';

const ListItem = ({ as = 'div', className, children, disabled, ...others }) => {
  const { bordered } = React.useContext(ListContext);

  return (
    <Box
      as={as}
      data-testid="list-item"
      {...others}
      borderless={bordered && ['horizontal', 'top']}
      paddingless="vertical"
      className={clsx(
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
