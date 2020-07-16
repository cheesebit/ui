import React from 'react';

import { Icon } from '../../atoms/icon';
import { List } from '../../atoms/list';
import DropdownContext from './dropdown-context';

const DropdownItem = ({ icon, onClick, ...others }) => {
  return (
    <DropdownContext.Consumer>
      {({ toggle, collapsed }) => (
        <List.Item
          leading={icon && <Icon name={icon} />}
          data-test="item"
          {...others}
          {...(collapsed && { tabIndex: '-1' })}
          borderless
          onClick={e => {
            toggle();

            if (onClick) {
              e.persist();
              onClick(e);
            }
          }}
          as="button"
          type="button"
        />
      )}
    </DropdownContext.Consumer>
  );
};

export default DropdownItem;
