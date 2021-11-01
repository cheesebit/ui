import React from 'react';

import { DEFAULT } from 'common/constants';
import { prop } from 'common/toolset';

const ActiveTabIndicator = ({ ...props }) => {
	return (
		<span
			{...props}
			className="active-indicator"
			data-testid="active-indicator"
		/>
	);
};

const areEqual = (prevProps, nextProps) => {
	const getStyle = prop('style');

	const prevStyle = getStyle(prevProps) || DEFAULT.OBJECT;
	const nextStyle = getStyle(nextProps) || DEFAULT.OBJECT;

	return ['left', 'width'].every(
		(attr) => prevStyle[attr] === nextStyle[attr]
	);
};

export default React.memo(ActiveTabIndicator, areEqual);
