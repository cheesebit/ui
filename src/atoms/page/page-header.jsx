import React from 'react';
import useClassy from '@cheesebit/classy';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 * @return {JSX.Element} Page header component.
 */
function PageHeader(props) {
	const { className, children, ...others } = props;
	const { classy } = useClassy(props);

	return (
		<header {...others} className={classy('header', className)} data-testid="page-header">
			{children}
		</header>
	);
}

export default PageHeader;
