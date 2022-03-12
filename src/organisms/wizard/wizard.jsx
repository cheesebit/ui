import React from 'react';
import { classy } from '@cheesebit/classy';

import { Button } from 'atoms/button';
import { Icon } from 'atoms/icon';
import { isNil, getID } from 'common/toolset';
import { Panels } from 'atoms/panels';
import { resolveProp } from 'common/props-toolset';
import logger from 'common/logger';
import selectors from './selectors';
import Step from './wizard-step';
import useWizard from './use-wizard';
import WizardContext from './wizard.context';

import './wizard.scss';

function hashed(id) {
	id = String(id || '');

	if (id.startsWith('#')) {
		return id;
	}

	return `#${id}`;
}

function unhashed(id) {
	id = String(id || '');

	if (id.startsWith('#')) {
		return id.slice(1);
	}

	return id;
}

/**
 *
 * @template T
 * @param {WizardProps<T>} props
 * @returns
 */
function Wizard(props) {
	const { id, className, children, title, flow, ...others } = props;
	const { transition, states, current, contextValue } = useWizard({
		current: unhashed(selectors.getActive(props)),
		id,
		flow,
	});
	/** @type {React.MutableRefObject<HTMLElement>}*/
	const selfRef = React.useRef();

	const transitionToPrevious = React.useCallback(() => {
		transition('previous');
	}, [transition]);

	const transitionToNext = React.useCallback(() => {
		transition('next');
	}, [transition]);

	React.useEffect(() => {
		logger.debug('wizard', 'navivating to', hashed(current));
		location.href = `${location.origin}${location.pathname}${location.search}${hashed(
			current
		)}`;
	}, [current]);

	return (
		<article ref={selfRef} id={id} className={classy('cc-wizard', className)} {...others}>
			<header className="header">
				<Button
					emphasis="text"
					onClick={transitionToPrevious}
					paddingless={['vertical']}
					className={classy({
						'cb-is-invisible': isNil(states?.previous),
					})}
				>
					<Icon name="arrow-back" />
				</Button>
				<span className="title" {...resolveProp(title, 'children')} />
				<Button
					emphasis="text"
					onClick={transitionToNext}
					paddingless={['vertical']}
					className={classy({
						'cb-is-invisible': isNil(states?.next),
					})}
				>
					<Icon name="arrow-forward" />
				</Button>
			</header>
			<WizardContext.Provider value={contextValue}>
				<Panels>{children}</Panels>
			</WizardContext.Provider>
		</article>
	);
}

Wizard.defaultProps = {
	id: getID(),
};

Wizard.Step = Step;

export default Wizard;

/**
 * @typedef {import('common/prop-types').IconProp} IconProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {React.HTMLAttributes<HTMLElement>} DefaultElementProps
 */

/**
 * @template T
 * @typedef {Object} CustomWizardProps
 * @property {string} [title] - Wizard title
 * @property {keyof T} [current] - Initial step
 * @property {import('@cheesebit/use-automaton').AutomatonStates<T>} flow - Wizard steps configuration
 */

/**
 * @template T
 * @typedef {DefaultElementProps & CustomWizardProps<T>} WizardProps
 */
