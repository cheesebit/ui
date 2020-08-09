import React from 'react';
import clsx from 'clsx';

import { Button, Emphasis } from '../../atoms/button';
import { isNil, getID } from '../../common/toolset';
import { resolveProp } from '../../common/props-toolset';
import DOMHelper from './dom-helper';
import Step from './wizard-step';
import useWizard from './use-wizard';
import WizardContext from './wizard-context';

import './wizard.scss';

const PREVIOUS_ICON = { name: 'arrow-back', size: 24 };
const PREVIOUS_PADDINGLESS = ['vertical', 'left'];

const NEXT_ICON = { name: 'arrow-forward', size: 24 };
const NEXT_PADDINGLESS = ['vertical', 'right'];

const Wizard = ({ id, className, children, title, flow, ...others }) => {
  const { transition, states, current, contextValue } = useWizard({
    ...others,
    id,
    flow,
  });

  React.useEffect(() => {
    // updates radio input associated to the current step
    !isNil(current) && DOMHelper.check({ id: current });
  }, [current]);

  const transitionToPrevious = React.useCallback(() => {
    transition('previous');
  }, [transition]);

  const transitionToNext = React.useCallback(() => {
    transition('next');
  }, [transition]);

  return (
    <article id={id} className={clsx('cc-wizard', className)} {...others}>
      <header className="header">
        <Button
          emphasis={Emphasis.text}
          icon={PREVIOUS_ICON}
          onClick={transitionToPrevious}
          paddingless={PREVIOUS_PADDINGLESS}
          className={clsx({
            'cb-is-invisible': isNil(states?.previous),
          })}
        />
        <span className="title" {...resolveProp(title, 'children')} />
        <Button
          emphasis={Emphasis.text}
          icon={NEXT_ICON}
          onClick={transitionToNext}
          paddingless={NEXT_PADDINGLESS}
          className={clsx({
            'cb-is-invisible': isNil(states?.next),
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
