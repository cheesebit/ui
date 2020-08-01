import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { sanitizeProps } from './helpers';

import './link.scss';

export const Target = {
  self: '_self',
  blank: '_blank',
  parent: '_parent',
  top: '_top',
};

export const Rel = {
  noreferrer: 'noreferrer',
  noopener: 'noopener',
};

/**
 * This component represents a link/anchor element. Internally we have implemented a few checks
 * to add/remove [recommended attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
 */
const Link = ({
  className,
  alt,
  title,
  children,
  disabled,
  target,
  rel,
  href,
  ...others
}) => {
  ({ rel, href } = sanitizeProps({ target, rel, href }));

  const classes = classNames(className, 'cb-link', {
    'is-disabled': disabled,
  });

  return (
    <a
      {...others}
      alt={alt}
      aria-label={alt || title}
      className={classes}
      data-testid="c-link"
      href={href}
      rel={rel}
      target={target}
      title={title || alt}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  alt: PropTypes.string,
  download: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.oneOf([
    Target.blank,
    Target.parent,
    Target.self,
    Target.top,
  ]),
};

Link.defaultProps = {
  alt: '',
  href: '#',
  disabled: false,
  target: Target.blank,
};

export default Link;
