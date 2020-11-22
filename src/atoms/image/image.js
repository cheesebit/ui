import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { omit } from '../../common/toolset';
import { Overlay, Theme } from '../overlay';
import { Spinner } from '../spinner';

import './image.scss';

const OMITTED_PROPS = ['src', 'srcSet', 'width', 'height'];

export const Status = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
};

// const getPlaceholderSrc = (width, height) =>
//   `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

function Image({ className, onLoad, onError, ...others }) {
  const [status, setStatus] = React.useState(Status.loading);

  function handleLoad() {
    setStatus(Status.loaded);

    onLoad?.();
  }

  function handleError() {
    setStatus(Status.failed);

    onError?.();
  }

  return (
    <div
      className={clsx(
        'cb-image',
        {
          'has-failed': status === Status.failed,
          'is-loading': status === Status.idle,
        },
        className,
      )}
      data-testid="cb-image"
    >
      <img
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...others}
      />

      {status === Status.loading && (
        <Overlay theme={Theme.light}>
          <Spinner size={2} />
        </Overlay>
      )}

      {status === Status.failed && (
        <div className="error" data-testid="image-error">
          :(
        </div>
      )}
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  src: '',
  alt: '',
  width: 345,
};

export default Image;
