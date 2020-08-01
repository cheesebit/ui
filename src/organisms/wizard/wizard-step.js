import React from 'react';
import classNames from 'classnames';

import { isFunction } from '../../common/toolset';
import WizardContext from './wizard-context';

const Step = ({ id, children, className, ...others }) => {
  const { id: wizardID, transition } = React.useContext(WizardContext);

  const renderChildren = React.useCallback(() => {
    if (isFunction(children)) {
      return children({ transition });
    }

    return children;
  }, [children, transition, wizardID]);

  return (
    <React.Fragment>
      <input
        type="radio"
        id={id}
        name={wizardID}
        value={id}
        data-testid="step-radio"
      />
      <div {...others} className={classNames('step', className)}>
        {renderChildren(children)}
      </div>
    </React.Fragment>
  );
};

export default Step;
