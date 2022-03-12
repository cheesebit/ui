import React from 'react';
import useClassy from '@cheesebit/classy';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 * @return {JSX.Element} Page footer component.
 */
function PageFooter(props) {
	const { className, children, ...others } = props;
	const { classy } = useClassy(props);

	return (
		<footer {...others} className={classy('footer', className)} data-testid="page-footer">
			{children}
		</footer>
	);
}

export default PageFooter;
