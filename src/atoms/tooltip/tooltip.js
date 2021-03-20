import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, isNil } from '../../common/toolset';
import { calculatePosition, getAnimationPhases } from './helpers';
import { useAnimation } from '../../hooks/animation';
import { BOTTOM_REGEX, LEFT_REGEX, RIGHT_REGEX, TOP_REGEX } from './constants';
import logger from '../../common/logger';

import './tooltip.scss';

export const Mode = {
  light: 'light',
  dark: 'dark',
};

export const Placement = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export const Variant = {
  danger: 'danger',
  info: 'info',
  success: 'success',
  warn: 'warn',
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

const Tooltip = ({
  children,
  className,
  mode,
  placement: placementProp,
  style: styleProp,
  title,
  variant,
  ...others
}) => {
  const selfRef = React.useRef();
  const [style, setStyle] = React.useState({ ...styleProp });

  const [{ top, left, placement }, setPosition] = React.useState({
    top: 0,
    left: 0,
    placement: placementProp,
  });
  const { className: animationClassName, onEnter, onExit } = useAnimation(
    STATES,
    getAnimationPhases(placement),
  );

  if (isNil(title) || isNil(children)) {
    return children;
  }

  // TODO: Update tooltip position when it is visible and user scrolls

  React.useEffect(
    function updateStyle() {
      setStyle({ ...styleProp, top, left });
    },
    [top, left],
  );

  const handleMouseEnter = e => {
    logger.debug(
      '[tooltip]',
      e.currentTarget.offsetTop,
      e.currentTarget.getBoundingClientRect().top,
    );

    setPosition(
      calculatePosition(placementProp, e.currentTarget, selfRef.current),
    );
    onEnter(e);
  };

  const handleMouseLeave = e => {
    onExit(e);
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      <span
        className={clsx(
          'cb-tooltip',
          {
            '-top': TOP_REGEX.test(placement),
            '-bottom': BOTTOM_REGEX.test(placement),
            '-right': RIGHT_REGEX.test(placement),
            '-left': LEFT_REGEX.test(placement),
          },
          {
            '-light': equals(mode, Mode.light),
            '-dark': equals(mode, Mode.dark),
          },
          {
            '-danger': equals(variant, Variant.danger),
            '-info': equals(variant, Variant.info),
            '-success': equals(variant, Variant.success),
            '-warn': equals(variant, Variant.warn),
          },
          animationClassName,
          className,
        )}
        {...others}
        ref={selfRef}
        title={null}
        style={style}
        aria-label={title}
        data-testid="cb-tooltip"
      >
        {title}
        {/* TODO Add an arrow */}
      </span>
    </React.Fragment>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  placement: PropTypes.oneOf([
    Placement.top,
    Placement.bottom,
    Placement.right,
    Placement.left,
  ]),
  mode: PropTypes.oneOf([Mode.light, Mode.dark]),
  variant: PropTypes.oneOf([
    Variant.danger,
    Variant.info,
    Variant.success,
    Variant.warn,
  ]),
};

Tooltip.defaultProps = {
  placement: Placement.top,
  mode: Mode.dark,
};

export default Tooltip;
