import React from 'react';
import PropTypes from 'prop-types';

/**
 * HoC to detect if an interaction has happened outside the given component.
 */
class ClickOutside extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.timeout = null;

    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleBlur, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleBlur, false);

    clearTimeout(this.timeout);
  }

  handleBlur(e) {
    const { onClickOutside } = this.props;

    const ref = this.ref.current;

    if (!ref) {
      console.error('Could not retrieve ref');
      return;
    }

    if (!ref.contains(e.target)) {
      /**
       * We call the callback on the next tick by using setTimeout.
       * This is necessary because we need to first check if another child
       * of the element has received focus as the blur event fires prior to the new focus event.
       *
       * Based on: https://reactjs.org/docs/accessibility.html
       */
      this.timeout = setTimeout(() => {
        onClickOutside && onClickOutside();
      });
    } else {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { children } = this.props;

    return children({
      ref: this.ref,
    });
  }
}

ClickOutside.propTypes = {
  children: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

export default ClickOutside;
