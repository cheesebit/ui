import React from 'react';

import { Icon } from '../../atoms/icon';
import { List } from '../../atoms/list';
import DropdownContext from './dropdown-context';

const DropdownItem = ({ id, icon, onClick, children, label, ...others }) => {
  return (
    <DropdownContext.Consumer>
      {({ toggle, collapsed }) => (
        <List.Item
          leading={icon && <Icon name={icon} />}
          data-testid="item"
          {...others}
          {...(collapsed && { tabIndex: '-1' })}
          id={id}
          borderless
          onClick={e => {
            toggle();

            if (onClick) {
              e.persist();
              onClick({ id });
            }
          }}
          as="button"
          type="button"
        >
          <span className="children">{label || children}</span>
        </List.Item>
      )}
    </DropdownContext.Consumer>
  );
};

export default DropdownItem;
