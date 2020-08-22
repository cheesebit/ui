import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { isFunction } from '../../common/toolset';
import TabsContext from './tabs-context';

function Tab({
  active,
  children,
  className,
  disabled,
  id,
  label,
  onClick,
  ...others
}) {
  const tabsID = React.useContext(TabsContext);

  const setCurrentActive = React.useCallback(e => {
    onClick?.({ id });
  });

  const renderLabel = () => {
    if (isFunction(children)) {
      return children({ id, active });
    }

    return label || children;
  };

  return (
    <React.Fragment>
      <input
        type="radio"
        id={id}
        name={tabsID}
        value={id}
        data-testid="tab-radio"
        onFocus={setCurrentActive}
      />

      <Box
        borderless
        {...others}
        role="tab"
        aria-disabled={disabled}
        aria-selected={active}
        as="label"
        className={clsx(
          'tab',
          {
            'is-active': active,
            'is-focused': active,
            'is-disabled': disabled,
          },
          className,
        )}
        data-testid="tab"
        htmlFor={id}
        onClick={setCurrentActive}
      >
        {renderLabel()}
      </Box>
    </React.Fragment>
  );
}

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
  disabled: false,
  label: null,
};

export default Tab;
