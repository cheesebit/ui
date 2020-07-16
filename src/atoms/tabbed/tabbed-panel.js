import React from 'react';
import classNames from 'classnames';
import { DEFAULT } from '../../common/constants';

class Panel extends React.PureComponent {
  get classes() {
    const { className } = this.props;

    return classNames(className, 'panel');
  }

  get style() {
    const { style } = this.props;

    return style || DEFAULT.OBJECT;
  }

  /**
   * This leverages the radio button behavior trigged when user presses up|right/down|left keys.
   */
  handleFocus = ({ target: { id } }) => {
    const { onFocus } = this.props;

    onFocus && onFocus({ id });
  };

  render() {
    const { children, id, tabbed, ...others } = this.props;

    return (
      <React.Fragment>
        <input
          type="radio"
          id={id}
          name={tabbed}
          onFocus={this.handleFocus}
          value={id}
          data-test="panel-radio"
        />
        <article {...others} style={this.style} className={this.classes}>
          {children}
        </article>
      </React.Fragment>
    );
  }
}

export default Panel;
