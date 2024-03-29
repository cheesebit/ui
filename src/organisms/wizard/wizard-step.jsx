import React from 'react';
import { classy } from '@cheesebit/classy';

import { isFunction } from 'common/toolset';
import { Panels } from '../../atoms/panels';
import WizardContext from './wizard.context';

function Step( { id, children, className, ...others } ) {
	const { id: wizardID, transition } = React.useContext( WizardContext );

	const renderChildren = React.useCallback( () => {
		if ( isFunction( children ) ) {
			return children( { transition } );
		}

		return children;
	}, [ children, transition, wizardID ] );

	return (
		<Panels.Panel
			id={ id }
			{ ...others }
			className={ classy( 'step', className ) }
			data-testid="wizard-step"
		>
			{ renderChildren() }
		</Panels.Panel>
	);
}

export default Step;
