import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useID } from '../../hooks/id';
import Panel from './panels-panel';
import PanelsContext from './panels-context';

import './panels.scss';

function Panels( { className, children, ...others } ) {
	const id = useID( others );

	return (
		<section
			className={ clsx( 'cb-panels', className ) }
			data-testid="cb-panels"
			{ ...others }
		>
			<PanelsContext.Provider value={ id }>{ children }</PanelsContext.Provider>
		</section>
	);
}

Panels.propTypes = {
	id: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

Panels.Panel = Panel;

export default Panels;
