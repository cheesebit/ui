import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { equals, values } from '../../common/toolset';
import { Overlay, Theme } from '../overlay';
import { Spinner } from '../spinner';
import './image.scss';

export const AspectRatio = {
  '1x1': '1x1',
  '16x9': '16x9',
  '4x3': '4x3',
  '3x2': '3x2',
  '8x5': '8x5',
};

export const Status = {
  idle: 'IDLE',
  loading: 'LOADING',
  loaded: 'LOADED',
  failed: 'FAILED',
};

class Image extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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

    return classNames(
      'cb-image',
      {
        '-ar-1x1': equals(options.aspectRatio, AspectRatio['1x1']),
        '-ar-16x9': equals(options.aspectRatio, AspectRatio['16x9']),
        '-ar-4x3': equals(options.aspectRatio, AspectRatio['4x3']),
        '-ar-3x2': equals(options.aspectRatio, AspectRatio['3x2']),
        '-ar-8x5': equals(options.aspectRatio, AspectRatio['8x5']),
      },
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
      },
      () => {
        this.image.current.src = src;
        this.image.current.srcSet = srcSet;

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
    const { status } = this.state;
    const { src, srcSet, className, options, alt, ...others } = this.props;

    return (
      <div {...others} className={this.classes} data-testid="cb-image">
        <img
          ref={this.image}
          alt={alt}
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
        {status === Status.loading && (
          <Overlay theme={Theme.light}>
            <Spinner size={4} />
          </Overlay>
        )}
        {status === Status.failed && this.renderError()}
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string,
  options: PropTypes.shape({
    aspectRatio: PropTypes.oneOf(values(AspectRatio)),
  }),
  alt: PropTypes.string,
};

Image.defaultProps = {
  options: {
    aspectRatio: AspectRatio['16x9'],
  },
  src: '',
  alt: '',
};

export default Image;
