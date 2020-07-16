import React from 'react';
import PropTypes from 'prop-types';

import { compareProps } from '../../common/props-toolset';
import { DEFAULT, Keys } from '../../common/constants';
import { compact, isEmpty, isNil, toArray, values } from '../../common/toolset';

const batata = (keys) => `${toArray(keys).sort().join('&')}`.toLowerCase();

const createCustomEvent = (shortcut) => {
  let shortcutEvent;

  if (window.CustomEvent) {
    shortcutEvent = new CustomEvent(shortcut);
  } else {
    shortcutEvent = document.createEvent('CustomEvent');
    shortcutEvent.initCustomEvent(shortcut, false, false, null);
  }

  return shortcutEvent;
};

const getCurrentTag = () => {
  return document.activeElement.tagName.toLowerCase();
};

/**
 * This component enables you to enable your component/screen with shortcuts.
 *
 * Based on https://github.com/jkup/shortcut.
 */
class ShortcutWatcher extends React.Component {
  constructor(props) {
    super(props);

    const { shortcuts } = this.props;
    this.shortcuts = toArray(shortcuts).reduce((map, { keys, event }) => {
      return {
        ...map,
        [batata(keys)]: event,
      };
    }, {});

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { disabled } = this.props;

    !disabled && this.subscribeToKeyEvents();
  }

  componentWillUnmount() {
    this.unsubscribeToKeyEvents();
  }

  componentDidUpdate(prevProps) {
    const areEqual = compareProps('disabled');
    const { disabled } = this.props;

    if (areEqual(prevProps, this.props)) {
      return;
    }

    if (disabled) {
      this.unsubscribeToKeyEvents();
    } else {
      this.subscribeToKeyEvents();
    }
  }

  get blacklist() {
    const { blacklist } = this.props;

    return blacklist || DEFAULT.ARRAY;
  }

  get whitelist() {
    const { whitelist } = this.props;

    return whitelist || DEFAULT.ARRAY;
  }

  subscribeToKeyEvents = () => {
    document.addEventListener('keypress', this.handleKeyPress, false);
  };

  unsubscribeToKeyEvents = () => {
    document.removeEventListener('keypress', this.handleKeyPress, false);
  };

  handleKeyPress(event) {
    const tag = getCurrentTag();
    if (
      (!isEmpty(this.blacklist) && this.blacklist[tag]) ||
      (!isEmpty(this.whitelist) && !this.whitelist[tag])
    ) {
      return;
    }

    this.handleShortcut(event);
  }

  handleShortcut = (event) => {
    const { key } = event;

    const shortcut = this.shortcuts[
      batata(
        compact([
          event.altKey && Keys.ALT,
          event.ctrlKey && Keys.CONTROL,
          event.shiftKey && Keys.SHIFT,
          key,
        ])
      )
    ];

    if (isNil(shortcut)) {
      return;
    }

    const shortcutEvent = createCustomEvent(shortcut);
    document.dispatchEvent(shortcutEvent);
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

ShortcutWatcher.propTypes = {
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      keys: PropTypes.oneOfType([
        PropTypes.oneOf(values(Keys)),
        PropTypes.arrayOf(PropTypes.oneOf(values(Keys))),
      ]).isRequired,
      event: PropTypes.string.isRequired,
    })
  ),
};

ShortcutWatcher.defaultProps = {
  blacklist: {
    input: true,
    textarea: true,
    select: true,
  },
};

export default ShortcutWatcher;
