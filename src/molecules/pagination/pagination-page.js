import React from 'react';
import clsx from 'clsx';

import { Button } from 'atoms/button';

/**
 * @param {PageProps} props
 * @return {JSX.Element} Pagination page component
 */
function Page(props) {
	const { className, ...others } = props;

	return <Button {...others} className={clsx('page', className)} />;
}

export default Page;

/**
 * @typedef {import('atoms/button/button').ButtonProps} PageProps
 */
