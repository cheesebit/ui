import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import PanelsContext from './panels-context';

export function getPanelRadioID(id) {
  return `cb-panel-radio-${id}`;
}

function Panel({ id, className, children, ...others }) {
  const panelsID = React.useContext(PanelsContext);

  return (
    <React.Fragment>
      <input
        type="radio"
        id={getPanelRadioID(id)}
        name={panelsID}
        value={id}
        data-testid="panel-radio"
        tabIndex={-1}
      />
      <article
        id={id}
        data-testid="panel"
        {...others}
        className={clsx('panel', className)}
      >
        {children}
      </article>
    </React.Fragment>
  );
}

Panel.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Panel;
