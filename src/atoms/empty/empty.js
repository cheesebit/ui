import React from 'react';

import './empty.scss';

/**
 * Empty component.
 *
 * @param {EmptyProps} props
 * @return {JSX.Element} Empty component.
 */
function Empty(props) {
	const { children } = props;

	return <div className="cb-empty">{children}</div>;
}

export default Empty;

/**
 * @typedef {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} EmptyProps
 */
