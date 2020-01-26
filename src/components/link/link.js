import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { DEFAULT } from "../../common/constants";
import { sanitizeProps } from "./helpers";
import { TARGETS } from "./constants";
import { values } from "../../common/toolset";

import "./link.scss";

/**
 * This component represents a link/anchor element. Internally we have implemented a few checks
 * to add/remove [recommended attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
 */
const Link = props => {
  const sanitizedProps = sanitizeProps(props || DEFAULT.OBJECT);

  const {
    className,
    alt,
    title,
    children,
    disabled,
    ...others
  } = sanitizedProps;

  const classes = classNames(className, "cc-link", {
    "is-disabled": disabled
  });

  return (
    <a
      alt={alt}
      aria-label={alt || title}
      className={classes}
      title={title || alt}
      {...others}
      data-test="c-link"
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  alt: PropTypes.string.isRequired,
  download: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.oneOf(values(TARGETS))
};

Link.defaultProps = {
  disabled: false,
  target: TARGETS.SELF
};

export default Link;
