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

const Tooltip = ({
  children,
  className,
  mode,
  placement: placementProp,
  style: styleProp,
  title,
  ...others
}) => {
  const selfRef = React.useRef();
  const [visible, setVisible] = React.useState(false); // test purpose
  const [{ top, left, placement }, setPosition] = React.useState({
    top: 0,
    left: 0,
    placement: placementProp,
  });
  const [style, setStyle] = React.useState({ ...styleProp, top, left });
  const { className: animationClassName, onEnter, onExit } = useAnimation(
    getAnimationPhases(placement),
  );

  if (isNil(title) || isNil(children)) {
    return children;
  }

  React.useEffect(
    function updateStyle() {
      setStyle({ ...styleProp, top, left });
    },
    [top, left, placementProp],
  );

  const handleMouseEnter = e => {
    logger.debug(
      '[tooltip]',
      e.currentTarget.offsetTop,
      e.currentTarget.getBoundingClientRect().top,
    );

    setVisible(true);
    setPosition(calculatePosition(placement, e.currentTarget, selfRef.current));
    onEnter(e);
  };

  const handleMouseLeave = e => {
    setVisible(false);
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
            '-light': equals(mode, Mode.light),
            '-dark': equals(mode, Mode.dark),
            '-top': TOP_REGEX.test(placement),
            '-bottom': BOTTOM_REGEX.test(placement),
            '-right': RIGHT_REGEX.test(placement),
            '-left': LEFT_REGEX.test(placement),
          },
          {
            'is-visible': visible,
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
};

Tooltip.defaultProps = {
  placement: Placement.top,
  mode: Mode.light,
};

export default React.memo(Tooltip);
