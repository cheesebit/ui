import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function Panel( { id, className, children, ...others } ) {
	return (

		<article
			id={ id }
			data-testid="panel"
			{ ...others }
			className={ clsx( 'panel', className ) }
		>
			{ children }
		</article>

	);
}

Panel.propTypes = {
	id: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ).isRequired,
};

export default Panel;
