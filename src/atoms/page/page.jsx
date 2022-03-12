import React from 'react';
import useClassy from '@cheesebit/classy';

import PageHeader from './page-header';
import PageBody from './page-body';
import PageFooter from './page-footer';

import './page.scss';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 * @return {JSX.Element} Page component.
 */
function Page(props) {
	const { className, children, ...others } = props;
	const { classy } = useClassy(props);

	return (
		<article data-testid="cb-page" className={classy('cb-page', className)} {...others}>
			{children}
		</article>
	);
}

Page.Header = PageHeader;
Page.Body = PageBody;
Page.Footer = PageFooter;

export default Page;
