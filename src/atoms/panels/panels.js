import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Panel from './panels-panel';

import './panels.scss';

function Panels( { className, children, ...others } ) {
	return (
		<section
			className={ clsx( 'cb-panels', className ) }
			data-testid="cb-panels"
			{ ...others }
		>
			{ children }
		</section>
	);
}

Panels.propTypes = {
	id: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

Panels.Panel = Panel;

export default Panels;
