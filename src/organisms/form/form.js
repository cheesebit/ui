import clsx from 'clsx';
import React, { Children } from 'react';

import './form.scss';

class Form extends React.Component {
  render() {
    const { className, children } = this.props;

    return (
      <div className={clsx('cb-form', className)}>
        <h2>Form</h2>
        {children}
      </div>
    );
  }
}

export default Form;
