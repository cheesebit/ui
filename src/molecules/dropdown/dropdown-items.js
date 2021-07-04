import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';

import { DEFAULT } from '../../common/constants';
import { isNil } from '../../common/toolset';
import { FloatingList } from '../../atoms/list';
import DropdownItem from './dropdown-item';
import { useAnimation } from '../../hooks/animation/';
import DropdownContext from './dropdown-context';

const ANIMATION_PHASES = {
  top: {
    out: 'cb-animation-enter-upward',
    in: 'cb-animation-exit-downard',
  },
  right: {
    out: 'cb-animation-enter-right',
    in: 'cb-animation-exit-left',
  },
  bottom: {
    out: 'cb-animation-enter-downard',
    in: 'cb-animation-exit-upward',
  },
  left: {
    out: 'cb-animation-enter-left',
    in: 'cb-animation-exit-right',
  },
};

const STATES = {
  out: {
    on: {
      enter: 'in',
    },
  },
  in: {
    on: {
      exit: 'out',
    },
  },
};

function DropdownItems(props) {
  const { collapsed } = useContext(DropdownContext);
  const { classy } = useClassy(props);
  const { className: animationClassName, onEnter, onExit } = useAnimation(
    STATES,
    ANIMATION_PHASES.bottom,
  );
  const { items, className, children, ...others } = props;

  useEffect(
    function animate() {
      if (collapsed) {
        onExit();
      } else {
        onEnter();
      }
    },
    [collapsed],
  );

  function renderItems() {
    if (!isNil(children)) {
      return children;
    }

    return (items || DEFAULT.ARRAY).map(item => (
      <DropdownItem key={item.id} {...item} />
    ));
  }

  return (
    <FloatingList
      data-testid="items"
      className={classy('menu', animationClassName, className)}
      {...others}
    >
      {renderItems()}
    </FloatingList>
  );
}

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
