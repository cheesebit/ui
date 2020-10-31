import React from 'react';
import clsx from 'clsx';

import { Button, Emphasis } from '../../atoms/button';
import { check } from './dom-helper';
import { isNil, getID } from '../../common/toolset';
import { Panels, getPanelRadioID } from '../../atoms/panels';
import { resolveProp } from '../../common/props-toolset';
import Step from './wizard-step';
import useWizard from './use-wizard';
import WizardContext from './wizard-context';

import './wizard.scss';
import { Icon } from '../../atoms/icon';

const PREVIOUS_ICON = { name: 'arrow-back', size: 24 };
const PREVIOUS_PADDINGLESS = ['vertical'];

const NEXT_ICON = { name: 'arrow-forward', size: 24 };
const NEXT_PADDINGLESS = ['vertical'];

const Wizard = ({ id, className, children, title, flow, ...others }) => {
  const { transition, states, current, contextValue } = useWizard({
    ...others,
    id,
    flow,
  });

  React.useEffect(() => {
    check(getPanelRadioID(current));
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
          onClick={transitionToPrevious}
          paddingless={PREVIOUS_PADDINGLESS}
          className={clsx({
            'cb-is-invisible': isNil(states?.previous),
          })}
        >
          <Icon {...PREVIOUS_ICON} />
        </Button>
        <span className="title" {...resolveProp(title, 'children')} />
        <Button
          emphasis={Emphasis.text}
          onClick={transitionToNext}
          paddingless={NEXT_PADDINGLESS}
          className={clsx({
            'cb-is-invisible': isNil(states?.next),
          })}
        >
          <Icon {...NEXT_ICON} />
        </Button>
      </header>
      <WizardContext.Provider value={contextValue}>
        <Panels>{children}</Panels>
      </WizardContext.Provider>
    </article>
  );
};

Wizard.defaultProps = {
  id: getID(),
};

Wizard.Step = Step;

export default Wizard;
