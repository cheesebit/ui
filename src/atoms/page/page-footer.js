import React from 'react';
import clsx from 'clsx';

const PageFooter = ( { className, children, ...others } ) => {
	return (
		<footer
			{ ...others }
			className={ clsx( 'footer', className ) }
			data-testid="page-footer"
		>
			{ children }
		</footer>
	);
};

export default PageFooter;
