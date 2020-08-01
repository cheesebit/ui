import React from 'react';
import classNames from 'classnames';

import { Button, Emphasis } from '../../atoms/button';
import { isNil, getID } from '../../common/toolset';
import {
  NEXT_ICON,
  NEXT_PADDINGLESS,
  PREVIOUS_ICON,
  PREVIOUS_PADDINGLESS,
} from './constants';
import { resolveProp } from '../../common/props-toolset';
import DOMHelper from './dom-helper';
import Step from './wizard-step';
import useWizard from '../../hooks/useWizard';
import WizardContext from './wizard-context';

import './wizard.scss';

const Wizard = ({ id, className, children, title, flow, ...others }) => {
  const { transition, states, active, contextValue } = useWizard({
    ...others,
    id,
    flow,
  });

  React.useEffect(() => {
    // updates radio input associated to the active step
    !isNil(active) && DOMHelper.check({ id: active });
  }, [active]);

  const transitionToPrevious = React.useCallback(() => {
    transition('previous');
  }, [transition]);

  const transitionToNext = React.useCallback(() => {
    transition('next');
  }, [transition]);

  return (
    <article id={id} className={classNames('cc-wizard', className)} {...others}>
      <header className="header">
        <Button
          emphasis={Emphasis.text}
          icon={PREVIOUS_ICON}
          onClick={transitionToPrevious}
          paddingless={PREVIOUS_PADDINGLESS}
          className={classNames({
            'cb-u-is-invisible': isNil(states?.previous),
          })}
        />
        <span className="title" {...resolveProp(title, 'children')} />
        <Button
          emphasis={Emphasis.text}
          icon={NEXT_ICON}
          onClick={transitionToNext}
          paddingless={NEXT_PADDINGLESS}
          className={classNames({
            'cb-u-is-invisible': isNil(states?.next),
          })}
        />
      </header>
      <WizardContext.Provider value={contextValue}>
        {children}
      </WizardContext.Provider>
    </article>
  );
};

Wizard.defaultProps = {
  id: getID(),
};

Wizard.Step = Step;

export default Wizard;
