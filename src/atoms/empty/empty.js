import React from 'react';

import './empty.scss';

function Empty( props ) {
	const { children } = props;

	return <div className="cb-empty">
		{ children }
	</div>;
}

export default Empty;
