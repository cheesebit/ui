import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { omit } from '../../common/toolset';
import { Overlay, Theme } from '../overlay';
import { Spinner } from '../spinner';

import './image.scss';

const OMITTED_PROPS = ['src', 'srcSet', 'width', 'height'];

export const Status = {
  idle: 'idle',
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
};

const getPlaceholderSrc = (width, height) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

class Image extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width = 16, height = 9 } = props;
    this.state = {
      src: getPlaceholderSrc(width, height),
      srcSet: null,
      status: Status.idle,
    };

    this.image = React.createRef();

    this.observer = null;
    this.unmounted = false;

    this.trials = 0;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleIntersection);

    this.observer.observe(this.image.current);
  }

  componentWillUnmount() {
    this.unmounted = true;

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  get classes() {
    const { className, options } = this.props;
    const { status } = this.state;

    return clsx(
      'cb-image',
      {
        'has-failed': status === Status.failed,
      },
      className,
    );
  }

  handleIntersection = entries => {
    const found = entries.find(entry => {
      const { target } = entry;
      return target === this.image.current;
    });

    if (this.unmounted || !found || !found.isIntersecting) {
      return;
    }

    const { src, srcSet } = this.props;

    this.setState(
      {
        status: Status.loading,
        src,
        srcSet,
      },
      () => {
        this.observer.disconnect();
      },
    );
  };

  handleLoad = () => {
    if (this.unmounted) {
      return;
    }

    const { onLoad } = this.props;

    this.setState({
      status: Status.loaded,
    });

    onLoad && onLoad();
  };

  handleError = () => {
    if (this.unmounted) {
      return;
    }

    const { onError } = this.props;

    this.setState({
      status: Status.failed,
    });

    onError && onError();
  };

  renderError = () => {
    return (
      <div className="error" style={this.style} data-testid="image-error">
        :(
      </div>
    );
  };

  render() {
    const { src, srcSet, status } = this.state;
    const { className, options, alt, ...others } = this.props;

    return (
      <div
        {...omit(OMITTED_PROPS, others)}
        className={this.classes}
        data-testid="cb-image"
      >
        <img
          ref={this.image}
          alt={alt}
          src={src}
          srcSet={srcSet}
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
        {status === Status.loading && (
          <Overlay theme={Theme.light}>
            <Spinner size={2} />
          </Overlay>
        )}
        {status === Status.failed && this.renderError()}
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  src: '',
  alt: '',
};

export default Image;
