import React from 'react';

import { path } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';

export default {
	getActive( { active, children, items } ) {
		const id =
		active ||
		path( [ '0', 'id' ], items ?? DEFAULT.ARRAY ) ||
		path(
			[ '0', 'props', 'id' ],
			React.Children.toArray( children ) ?? DEFAULT.ARRAY,
		) ||
		null;

		return id;
	},
};
