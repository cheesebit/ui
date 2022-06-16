import { path } from 'common/toolset';
import { DEFAULT } from 'common/constants';

export default {
	/**
	 *
	 * @param {import('./tabs').TabsProps} props
	 * @return {string} ID of the currently active tab.
	 */
	getActive( props ) {
		const { items } = props;
		const id =
			location.hash ||
			path( [ '0', 'id' ], items ?? DEFAULT.ARRAY ) ||
			null;

		return id;
	},
};
