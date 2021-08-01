import { path } from 'common/toolset';
import { DEFAULT } from 'common/constants';

export default {
	getActive( { items } ) {
		const id = location.hash || path( [ '0', 'id' ], items ?? DEFAULT.ARRAY ) || null;

		return id;
	},
};
