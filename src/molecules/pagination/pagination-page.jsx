import React from 'react';
import { classy } from '@cheesebit/classy';

import { Button } from 'atoms/button';

/**
 * @param {PageProps} props
 * @return {JSX.Element} Pagination page component
 */
function Page(props) {
	const { className, ...others } = props;

	return <Button {...others} className={classy('page', className)} />;
}

export default Page;

/**
 * @typedef {import('atoms/button/button').ButtonProps} PageProps
 */
