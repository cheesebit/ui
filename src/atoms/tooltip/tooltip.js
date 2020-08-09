import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, isNil } from '../../common/toolset';
import { updatePosition } from './helpers';
import { useAnimation } from '../../hooks/animation';
import {
  TOP_REGEX,
  BOTTOM_REGEX,
  RIGHT_REGEX,
  LEFT_REGEX,
  PHASES,
} from './constants';
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

const Tooltip = ({ children, className, title, mode, placement }) => {
  const selfRef = React.useRef();
  const [visible, setVisible] = React.useState(false); // test purpose
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const {
    className: animationClassName,
    onEnter,
    onExit,
    setTarget,
  } = useAnimation(PHASES);

  if (isNil(title) || isNil(children)) {
    return children;
  }

  React.useEffect(() => {
    setTarget(selfRef.current);
  }, []);

  const handleMouseEnter = e => {
    logger.debug(
      '[tooltip]',
      e.currentTarget.offsetTop,
      e.currentTarget.getBoundingClientRect().top,
    );

    setVisible(true);
    setPosition(updatePosition(e.currentTarget, selfRef.current));
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
        ref={selfRef}
        title={null}
        aria-label={title}
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
        style={{
          top: position.top,
          left: position.left,
        }}
        data-testid="cb-tooltip"
      >
        {title}
        <span className="arrow" />
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
