import React from 'react';

import { DEFAULT } from '../../common/constants';
import ResizeWatcher from './resize-watcher';

/**
 * Enabled the `WrappedComponent` with the resize watching feature. The provided
 * `options` are sent down as props to the `ResizeWatcher`.
 * @param {React.Component} WrappedComponent Component to be wrapped with `ResizeWatcher`.
 * @param {object} options Additional options object.
 * @param {number} options.wait Debounce wait to the resize listener
 * @returns {React.Component} The given WrappedComponent as children of a ResizeWatcher.
 */
function withResizeWatcher(WrappedComponent, options) {
  return props => (
    <ResizeWatcher {...(options || DEFAULT.OBJECT)}>
      {({ width }) => <WrappedComponent {...props} width={width} />}
    </ResizeWatcher>
  );
}

export default withResizeWatcher;
