import React from 'react';
import useClassy from '@cheesebit/classy';

import Panel from './panels-panel';

import './panels.scss';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 * @return {JSX.Element} Page footer component.
 */
function Panels(props) {
	const { className, children, ...others } = props;
	const { classy } = useClassy(props);

	return (
		<section className={classy('cb-panels', className)} data-testid="cb-panels" {...others}>
			{children}
		</section>
	);
}

Panels.Panel = Panel;

export default Panels;
