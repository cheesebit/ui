import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { isEmpty, isNil } from '../../common/toolset';
import { List } from '../../atoms/list';
import DropdownItem from './dropdown-item';

const DropdownItems = ({
  className,
  children,
  hoverable,
  items,
  ...others
}) => {
  if (isEmpty(items) && isNil(children)) {
    return null;
  }

  return (
    <List
      data-testid="items"
      {...others}
      hoverable={hoverable}
      className={classNames('menu', className)}
    >
      {(items || DEFAULT.ARRAY).map(item => (
        <DropdownItem key={item.id} {...item} />
      ))}
      {children}
    </List>
  );
};

DropdownItems.propTypes = {
  hoverable: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.string,
      leading: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]),
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]),
      trailing: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]),
      paddingless: PropTypes.oneOfType([
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
      onClick: PropTypes.func.isRequired,
    }),
  ),
};

DropdownItems.defaultProps = {
  hoverable: true,
};

export default DropdownItems;
