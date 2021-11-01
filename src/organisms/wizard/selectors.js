import { keys, path } from 'common/toolset';
import { DEFAULT } from 'common/constants';

export default {
	/**
	 *
	 * @param {*} props
	 * @return {string} ID of the currently active tab.
	 */
	getActive(props) {
		const { flow } = props;
		const id =
			location.hash || path(['0'], keys(flow) ?? DEFAULT.ARRAY) || null;

		return id;
	},
};
