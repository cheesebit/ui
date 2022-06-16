import React from 'react';
import useClassy from '@cheesebit/classy';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 * @return {JSX.Element} Page footer component.
 */
function Panel( props ) {
	const { id, className, children, ...others } = props;
	const { classy } = useClassy( props );

	return (
		<article
			id={ id }
			data-testid="panel"
			{ ...others }
			className={ classy( 'panel', className ) }
		>
			{ children }
		</article>
	);
}

export default Panel;
